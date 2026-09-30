import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate-trust-passports.mjs"


class TrustPassportGateTests(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="cs-passports-"))
        for name in ["installer", "trust", "skills"]:
            shutil.copytree(ROOT / name, self.tmp / name)
        (self.tmp / "scripts").mkdir()
        shutil.copy2(ROOT / "scripts" / "security-check.mjs", self.tmp / "scripts" / "security-check.mjs")

    def tearDown(self):
        shutil.rmtree(self.tmp)

    def validate(self):
        return subprocess.run(
            ["node", str(VALIDATOR)],
            cwd=self.tmp,
            text=True,
            capture_output=True,
            check=False,
        )

    def passport_path(self, skill_id="cs-navigator"):
        return self.tmp / "trust" / "passports" / f"{skill_id}.json"

    def test_current_passports_pass(self):
        result = self.validate()
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_corrupted_artifact_hash_is_rejected(self):
        path = self.passport_path()
        data = json.loads(path.read_text(encoding="utf-8"))
        data["integrity"]["artifact_sha256"] = "0" * 64
        path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        result = self.validate()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("passport does not match", result.stderr)

    def test_missing_evidence_reference_is_rejected(self):
        path = self.passport_path()
        data = json.loads(path.read_text(encoding="utf-8"))
        data["security"]["evidence_refs"].append("trust/does-not-exist.json")
        path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        result = self.validate()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("missing security evidence ref", result.stderr)

    def test_mutable_or_invalid_source_revision_is_rejected(self):
        path = self.passport_path()
        data = json.loads(path.read_text(encoding="utf-8"))
        data["provenance"]["reviewed_source_revision"] = "main"
        path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        result = self.validate()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("reviewed_source_revision must be immutable", result.stderr)

    def test_missing_passport_is_rejected(self):
        self.passport_path("regenerative-impact-map").unlink()
        result = self.validate()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("missing or invalid passport", result.stderr)

    def test_skill_byte_change_invalidates_passport(self):
        skill = self.tmp / "skills" / "featured" / "cs-navigator" / "SKILL.md"
        skill.write_text(skill.read_text(encoding="utf-8") + "\n# drift fixture\n", encoding="utf-8")
        result = self.validate()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("passport does not match", result.stderr)


if __name__ == "__main__":
    unittest.main()
