import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class BehaviorEvalEvidenceTests(unittest.TestCase):
    def test_capability_pack_i_has_normalized_task_evidence(self):
        ids = [
            "regenerative-language-bridge-chatgpt-v1-r6",
            "regenerative-impact-map-chatgpt-v1-r6",
            "regenerative-resilience-plan-chatgpt-v1-r6",
            "regenerative-adaptive-experiment-chatgpt-v1-r6",
        ]
        for plan_id in ids:
            with self.subTest(plan_id=plan_id):
                plan = ROOT / "trust" / "evals" / "plans" / f"{plan_id}.json"
                self.assertTrue(plan.is_file(), plan)
                parsed = json.loads(plan.read_text(encoding="utf-8"))
                self.assertGreaterEqual(parsed["minimum_cases"], 1)

    def test_unmeasured_metrics_are_not_invented(self):
        for path in (ROOT / "trust" / "evals" / "runs").glob("*.json"):
            run = json.loads(path.read_text(encoding="utf-8"))
            if run["metrics"]["measurement_state"] == "not-collected":
                self.assertIsNone(run["metrics"]["input_tokens"])
                self.assertIsNone(run["metrics"]["output_tokens"])
                self.assertIsNone(run["metrics"]["elapsed_ms"])
                self.assertIsNone(run["metrics"]["cost_usd"])
                self.assertIsNone(run["metrics"]["tool_calls"])


if __name__ == "__main__":
    unittest.main()
