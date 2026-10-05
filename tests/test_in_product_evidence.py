import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate-in-product-evidence.mjs"
def latest_navigator_plan():
    data = json.loads((ROOT / "trust" / "in-product-tests.json").read_text(encoding="utf-8"))
    plans = [plan for plan in data["tests"] if plan["skill_id"] == "cs-navigator"]
    if not plans:
        raise AssertionError("cs-navigator must have at least one in-product test plan")
    return plans[-1]


def valid_run():
    plan = latest_navigator_plan()
    case_ids = [case["id"] for case in plan["cases"]]
    return {
        "test_id": plan["id"],
        "skill_id": "cs-navigator",
        "result": "pass",
        "executed_at": "2026-10-05T17:23:00-03:00",
        "product_surface": plan["surface"],
        "package_version": "0.9.0-test-fixture",
        "distribution": plan["required_distribution"],
        "source_revision": plan["required_source_revision"],
        "artifact_sha256": plan["required_artifact_sha256"],
        "case_ids": case_ids,
        "assertions": [
            {"case_id": case_id, "pass": True, "observed": f"Observed expected behavior for {case_id}."}
            for case_id in case_ids
        ],
    }


class InProductEvidenceGateTests(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="cs-in-product-"))
        shutil.copytree(ROOT / "trust", self.tmp / "trust")

    def tearDown(self):
        shutil.rmtree(self.tmp)

    def validate(self, run):
        (self.tmp / "trust" / "in-product-runs.json").write_text(
            json.dumps({"schema_version": 1, "runs": [run]}, indent=2) + "\n",
            encoding="utf-8",
        )
        return subprocess.run(
            ["node", str(VALIDATOR)],
            cwd=self.tmp,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_exact_native_run_passes_validation(self):
        result = self.validate(valid_run())
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_manual_file_upload_simulation_cannot_count_as_native_pass(self):
        run = valid_run()
        run["product_surface"] = "manual-file-upload-simulation"
        result = self.validate(run)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("product_surface must exactly match", result.stderr)

    def test_wrong_source_revision_is_rejected(self):
        run = valid_run()
        run["source_revision"] = "0" * 40
        result = self.validate(run)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("source_revision must match", result.stderr)

    def test_wrong_artifact_hash_is_rejected(self):
        run = valid_run()
        run["artifact_sha256"] = "0" * 64
        result = self.validate(run)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("artifact_sha256 must match", result.stderr)

    def test_missing_case_assertion_is_rejected(self):
        run = valid_run()
        run["assertions"] = run["assertions"][:-1]
        result = self.validate(run)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("assertion for every planned case", result.stderr)


if __name__ == "__main__":
    unittest.main()
