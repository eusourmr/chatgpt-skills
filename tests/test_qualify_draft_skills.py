#!/usr/bin/env python3
"""No bulk promotion and no ignored distribution restrictions."""
import importlib.util
import pathlib
import unittest

script=pathlib.Path(__file__).resolve().parents[1] / "scripts/qualify-draft-skills.py"
spec=importlib.util.spec_from_file_location("qualify_drafts",script)
m=importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

class DraftQualificationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.result=m.audit()

    def test_exact_draft_set_has_distinct_task_case(self):
        self.assertEqual(self.result["skills_draft_total"],48)
        self.assertEqual(self.result["plans_created"],48)
        self.assertEqual(self.result["issues"],[])
        self.assertEqual(len({s["skill_id"] for s in self.result["skills"]}),48)

    def test_full_negative_and_evidence_case_set_is_planned_not_run(self):
        self.assertEqual(self.result["scenarios_planned"],144)
        self.assertEqual(self.result["scenarios_executed"],0)
        for skill in self.result["skills"]:
            self.assertEqual({t["type"] for t in skill["evaluation_cases"]},
                             {"goal","non_activation","evidence_boundary"})
            self.assertTrue(all(t["result"]=="not_run" for t in skill["evaluation_cases"]))

    def test_no_automatic_promotion(self):
        self.assertEqual(self.result["promotions_authorized"],0)
        self.assertTrue(all(not s["can_promote"] for s in self.result["skills"]))
        self.assertTrue(all(s["gates"]["host_loaded"]=="not_verified" for s in self.result["skills"]))

    def test_sensitive_exclusions_preserved(self):
        statuses={s["skill_id"]:s["distribution_state"] for s in self.result["skills"]}
        self.assertEqual(statuses["caregiver-coordinator"],"excluded")
        self.assertEqual(statuses["medical-appointment-prep"],"excluded")
        self.assertTrue(all(s["distribution_rationale"] for s in self.result["skills"]
                            if s["distribution_state"]=="excluded"))

    def test_source_references_are_hashed_not_conflated_with_execution(self):
        for skill in self.result["skills"]:
            self.assertEqual(len(skill["source_contract"]["source_sha256"]),64)
            self.assertTrue(skill["source_contract"]["file_exists"])
            self.assertNotEqual(skill["gates"]["source_integrity"],skill["gates"]["outcome_verified"])

if __name__=="__main__":
    unittest.main()
