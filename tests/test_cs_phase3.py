"""Adversarial evidence-consistency tests. All fabricated host receipts are fixtures.

No test invokes a model, authenticates a host export, or measures CS usefulness.
"""
import copy
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("cs_phase3", ROOT / "scripts/qualify-cs-phase3.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class EvidenceFixtures(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.serial = 0
        protocol = json.loads((ROOT / m.PHASE / "protocol.json").read_text())
        prompt = (ROOT / protocol["routes"]["ROUTE-02"]["prompt"]["path"]).read_text()
        self.prompt = self.put(prompt)
        self.put(json.dumps(protocol), m.PHASE + "/protocol.json")
        self.context = self.put("Identical neutral context fixture. No prior answers.\n")
        self.source = self.put("Synthetic specialist fixture. Not real host-loaded instructions.\n")
        self.inputs = [self.put("synthetic source fixture\n")]
        self.corrected = self.put("TAP version 13\nok 1 - corrected\n# tests 1\n# pass 1\n# fail 0\n")
        self.baseline = self.put("TAP version 13\nnot ok 1 - baseline\nERR_ASSERTION\n# tests 1\n# pass 0\n# fail 1\n")
        self.pair = {"state": "submitted_pair", "control": self.make_run("control"),
                     "treatment": self.make_run("treatment")}

    def put(self, text, name=None):
        self.serial += 1
        path = Path(name or f"fixture-{self.serial}.txt")
        (self.root / path).parent.mkdir(parents=True, exist_ok=True)
        (self.root / path).write_text(text, encoding="utf-8")
        return {"path": str(path), "sha256": m.digest(text.encode())}

    def change(self, run, field, edit):
        value = m.obj(self.root, run[field])
        edit(value)
        run[field] = self.put(json.dumps(value))

    def make_run(self, arm):
        session = arm + "-session"
        treatment = arm == "treatment"
        env = {"capture_kind": "host_export", "session_id": session,
               "environment_id": arm + "-fixture-env", "context_reset": True,
               "model": {"id": "fixture-model", "build": "fixture-build",
                         "reasoning_effort": "fixture-setting", "sampling": "fixture-setting"}}
        inventory = {"capture_kind": "host_export", "session_id": session, "complete": True,
                     "skills": [m.SPECIALIST] if treatment else [], "tools": []}
        trace = {"capture_kind": "host_export", "session_id": session, "complete": True,
                 "scope": "task_only", "events": [{"event": "skill_read", "skill_id": m.SPECIALIST,
                 "success": True, "resource": "skill://plugins_6aee22530eb88191bed0e982d96d1218/engineering-investigator-labs/SKILL.md",
                 "source_sha256": self.source["sha256"]}] if treatment else []}
        return {"kind": "host_run", "environment": self.put(json.dumps(env)),
                "inventory": self.put(json.dumps(inventory)), "trace": self.put(json.dumps(trace)),
                "prompt": self.prompt, "context": self.context,
                "response": self.put("Synthetic answer fixture. No measured outcome.\n"),
                "skill_source": self.source, "test_receipts": [
                    {"role": "corrected", "inputs": self.inputs, "output": self.corrected,
                     "exit_code": 0, "expected_exit_code": 0, "tests": 1, "pass": 1, "fail": 0},
                    {"role": "baseline", "inputs": self.inputs, "output": self.baseline,
                     "exit_code": 1, "expected_exit_code": 1, "tests": 1, "pass": 0, "fail": 1}]}

    def rejected_pair(self):
        with self.assertRaises(m.EvidenceError):
            m.compare_ab(self.root, self.pair)

    def test_consistent_pair_still_does_not_authorize_causal_claim(self):
        result = m.compare_ab(self.root, self.pair)
        self.assertEqual(result["state"], "pair_consistent_pending_blind_review")
        self.assertIs(result["causal_claim_allowed"], False)

    def test_unselected_but_available_skill_contaminates_control(self):
        self.change(self.pair["control"], "inventory", lambda x: x["skills"].append(m.SPECIALIST))
        self.rejected_pair()

    def test_registry_tool_alone_contaminates_control(self):
        self.change(self.pair["control"], "inventory", lambda x: x["tools"].append("mcp__cs_navigator_registry__registry_status"))
        self.rejected_pair()

    def test_control_claim_is_rejected_without_treating_it_as_execution(self):
        self.pair["control"]["response"] = self.put("Usei engineering-investigator-labs.")
        self.rejected_pair()

    def test_actual_cs_event_in_control_rejected(self):
        self.change(self.pair["control"], "trace", lambda x: x["events"].append({"event": "skill_read", "skill_id": m.SPECIALIST}))
        self.rejected_pair()

    def test_same_environment_is_not_an_isolated_control(self):
        self.change(self.pair["control"], "environment", lambda x: x.update(environment_id="treatment-fixture-env"))
        self.rejected_pair()

    def test_different_model_cannot_be_compared_as_matched(self):
        self.change(self.pair["control"], "environment", lambda x: x["model"].update(id="another-model"))
        self.rejected_pair()

    def test_unknown_configuration_cannot_be_declared_equivalent(self):
        for arm in ("control", "treatment"):
            self.change(self.pair[arm], "environment", lambda x: x["model"].update(build="unreported"))
        self.rejected_pair()

    def test_identical_but_unfrozen_prompt_rejected(self):
        changed = self.put("A leading prompt favoring one condition.")
        for run in (self.pair["control"], self.pair["treatment"]):
            run["prompt"] = changed
        self.rejected_pair()

    def test_prior_context_contamination_rejected(self):
        self.pair["control"]["context"] = self.put("A prior treatment response already appears here.")
        self.rejected_pair()

    def test_partial_inventory_is_not_evidence_of_absence(self):
        self.change(self.pair["control"], "inventory", lambda x: x.update(complete=False))
        self.rejected_pair()

    def test_partial_trace_cannot_certify_no_calls(self):
        self.change(self.pair["control"], "trace", lambda x: x.update(complete=False))
        self.rejected_pair()

    def test_transcribed_tool_receipt_is_not_full_host_export(self):
        self.change(self.pair["treatment"], "trace", lambda x: x.update(capture_kind="tool_result_transcription"))
        self.rejected_pair()

    def test_receipts_from_different_sessions_rejected(self):
        self.change(self.pair["control"], "trace", lambda x: x.update(session_id="other-session"))
        self.rejected_pair()

    def test_available_specialist_without_a_read_is_not_invoked(self):
        self.change(self.pair["treatment"], "trace", lambda x: x.update(events=[]))
        self.rejected_pair()

    def test_read_of_different_source_bytes_rejected(self):
        self.pair["treatment"]["skill_source"] = self.put("Different source version.")
        self.rejected_pair()

    def test_hash_mismatch_rejected(self):
        self.pair["treatment"]["response"]["sha256"] = "0" * 64
        self.rejected_pair()

    def test_baseline_infrastructure_error_is_not_bug_reproduction(self):
        baseline = self.pair["treatment"]["test_receipts"][1]
        baseline["output"] = self.put("TAP version 13\nMODULE_NOT_FOUND\n# tests 1\n# pass 0\n# fail 1\n")
        self.rejected_pair()

    def test_zero_tests_not_a_successful_regression(self):
        corrected = self.pair["treatment"]["test_receipts"][0]
        corrected.update(tests=0, **{"pass": 0})
        corrected["output"] = self.put("TAP version 13\n# tests 0\n# pass 0\n# fail 0\n")
        self.rejected_pair()

    def test_missing_baseline_contrast_rejected(self):
        self.pair["treatment"]["test_receipts"].pop()
        self.rejected_pair()

    def test_trivial_task_requires_no_tools_even_unrelated(self):
        run = self.pair["control"]
        run["response"] = self.put("Brasília.")
        self.assertIn("pending_independent_review", m.route_evidence(self.root, run, "ROUTE-01"))
        self.change(run, "trace", lambda x: x["events"].append({"event": "web_search"}))
        with self.assertRaises(m.EvidenceError):
            m.route_evidence(self.root, run, "ROUTE-01")

    def test_path_escape_and_symlink_escape_rejected(self):
        with self.assertRaises(m.EvidenceError):
            m.artifact(self.root, {"path": "../outside", "sha256": "0" * 64})
        (self.root / "escape").symlink_to(ROOT / "AGENTS.md")
        with self.assertRaises(m.EvidenceError):
            m.artifact(self.root, {"path": "escape", "sha256": "0" * 64})


class RepositoryEvidence(unittest.TestCase):
    def test_committed_work_does_not_close_unexecuted_host_gates(self):
        result = m.check()
        self.assertEqual(result["host_routes"], {"ROUTE-01": "not_run", "ROUTE-02": "not_run"})
        self.assertEqual(result["ab"]["state"], "control_unavailable")
        self.assertFalse(result["promotion_allowed"])
        self.assertEqual(result["batch"]["source_reviews"], 3)
        self.assertEqual(result["batch"]["behavior_cases_executed"], 0)
        self.assertEqual(result["production"], "all_pinned_files_unchanged")

    def test_source_review_cannot_be_relabelled_as_behavior_or_promotion(self):
        batch = m.load(ROOT / m.PHASE / "batch-01.json")
        changed = copy.deepcopy(batch)
        changed["skills"][0]["cases"][0]["status"] = "passed"
        with self.assertRaises(m.EvidenceError):
            m.check_batch(ROOT, changed)
        changed = copy.deepcopy(batch)
        changed["skills"][0]["promotion_allowed"] = True
        with self.assertRaises(m.EvidenceError):
            m.check_batch(ROOT, changed)

    def test_excluded_skill_cannot_enter_batch_via_alias(self):
        batch = m.load(ROOT / m.PHASE / "batch-01.json")
        batch["skills"][0]["skill_id"] = "medical-appointment-prep"
        with self.assertRaises(m.EvidenceError):
            m.check_batch(ROOT, batch)

    def test_packets_are_identical_neutral_inputs_not_model_runs(self):
        with tempfile.TemporaryDirectory() as tmp:
            dest = Path(tmp) / "packets"
            result = m.prepare(dest)
            self.assertEqual((dest / "A/prompt.txt").read_bytes(), (dest / "B/prompt.txt").read_bytes())
            self.assertEqual(result["state"], "packets_prepared_not_executed")
            self.assertFalse((dest / "A/response.txt").exists())
            with self.assertRaises(FileExistsError):
                m.prepare(dest)


if __name__ == "__main__":
    unittest.main()
