"""Homologation evidence gate: positive outcomes must NEVER be inferred from fixtures."""
import importlib.util
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("cs_curation_host", ROOT/"scripts/qualify-cs-curation-host.py")
checker=importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)

class EvidenceBoundaries(unittest.TestCase):
    def test_frozen_protocol_still_awaits_real_execution(self):
        cases,protocol=checker.read_baseline()
        self.assertEqual(len(cases["cases"]),12)
        self.assertFalse(protocol["host_run_evidence_supplied"])
        self.assertEqual(protocol["state"],"awaiting_independent_host_evidence")
    def test_absence_of_host_runs_rejected(self):
        with self.assertRaisesRegex(checker.GateError,"12 independent"):
            checker.validate_dossier({"schema_version":1,"state":"submitted_for_review","treatment":[],"control":[]})
    def test_asserted_host_pass_cannot_be_submitted_as_pass(self):
        with self.assertRaisesRegex(checker.GateError,"self-certify"):
            checker.validate_dossier({"schema_version":1,"state":"homologated","treatment":[],"control":[]})
    def test_fake_incomplete_receipt_rejected(self):
        case=checker.read_baseline()[0]["cases"][0]
        with self.assertRaisesRegex(checker.GateError,"Host-export"):
            checker.validate_run({"case_id":case["id"],"arm":"treatment","capture_kind":"synthetic"}, {case["id"]:case},arm="treatment")
    def test_model_configuration_and_prompt_are_required(self):
        case=checker.read_baseline()[0]["cases"][0]
        start={"case_id":case["id"],"arm":"treatment","capture_kind":"host_export",
               "context_reset":True,"inventory_complete":True,"trace_complete":True,
               "environment_id":"env-1","session_id":"session-1",
               "prompt_sha256":"0"*64, "response_text":"resposta","model":{},
               "available_skills":[],"available_tools":[],"events":[]}
        with self.assertRaisesRegex(checker.GateError,"Prompt changed"):
            checker.validate_run(start,{case["id"]:case},arm="treatment")
        start["prompt_sha256"]=checker.digest(case["prompt"])
        with self.assertRaisesRegex(checker.GateError,"Model configuration"):
            checker.validate_run(start,{case["id"]:case},arm="treatment")
    def test_native_first_requires_zero_tool_calls_when_a_valid_receipt_is_present(self):
        self.assertEqual(checker.read_baseline()[0]["cases"][0]["expect_specialist_reads"],0)

if __name__=="__main__":
    unittest.main()
