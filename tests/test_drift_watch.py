import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "update-drift-status.mjs"


class DriftWatchTests(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="cs-drift-"))
        for name in ["installer", "trust", "skills"]:
            shutil.copytree(ROOT / name, self.tmp / name)

    def tearDown(self):
        shutil.rmtree(self.tmp)

    def run_write(self, as_of="2026-09-30"):
        return subprocess.run(
            ["node", str(SCRIPT), "--write", "--as-of", as_of],
            cwd=self.tmp,
            text=True,
            capture_output=True,
            check=False,
        )

    def read_state(self, skill_id="cs-navigator"):
        p = self.tmp / "trust" / "upstream" / f"{skill_id}.json"
        return json.loads(p.read_text(encoding="utf-8"))

    def test_unchanged_skill_is_current(self):
        result = self.run_write()
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(self.read_state()["state"], "current")
        self.assertEqual(self.read_state()["action"], "none")

    def test_byte_change_moves_to_re_review_required(self):
        skill = self.tmp / "skills" / "featured" / "cs-navigator" / "SKILL.md"
        skill.write_text(skill.read_text(encoding="utf-8") + "\n# upstream drift fixture\n", encoding="utf-8")
        result = self.run_write()
        self.assertEqual(result.returncode, 0, result.stderr)
        state = self.read_state()
        self.assertEqual(state["state"], "changed-unreviewed")
        self.assertEqual(state["action"], "re-review-required")
        self.assertNotEqual(state["current_artifact_sha256"], state["reviewed_artifact_sha256"])

    def test_expired_evidence_becomes_stale(self):
        result = self.run_write(as_of="2027-01-15")
        self.assertEqual(result.returncode, 0, result.stderr)
        state = self.read_state()
        self.assertEqual(state["state"], "stale")
        self.assertEqual(state["action"], "re-review-required")


if __name__ == "__main__":
    unittest.main()
