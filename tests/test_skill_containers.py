import json
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR = ROOT / "scripts" / "validate-skill-containers.mjs"


class SkillContainerTests(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp(prefix="cs-container-"))
        (self.tmp / "trust" / "containers").mkdir(parents=True)
        shutil.copy2(ROOT / "trust" / "containers" / "default.json", self.tmp / "trust" / "containers" / "default.json")

    def tearDown(self):
        shutil.rmtree(self.tmp)

    def run_validator(self):
        return subprocess.run(
            ["node", str(VALIDATOR)],
            cwd=self.tmp,
            text=True,
            capture_output=True,
            check=False,
        )

    def mutate(self, fn):
        p = self.tmp / "trust" / "containers" / "default.json"
        data = json.loads(p.read_text(encoding="utf-8"))
        fn(data)
        p.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

    def test_default_container_passes(self):
        result = self.run_validator()
        self.assertEqual(result.returncode, 0, result.stderr)

    def test_completion_at_any_cost_is_rejected(self):
        self.mutate(lambda x: x["principles"].__setitem__("completion_at_any_cost", True))
        result = self.run_validator()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("completion-at-any-cost", result.stderr)

    def test_permission_widening_is_rejected(self):
        self.mutate(lambda x: x["capability_boundary"].__setitem__("permission_widening", "allow"))
        result = self.run_validator()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("permission widening", result.stderr)

    def test_fabricated_tool_results_are_rejected(self):
        self.mutate(lambda x: x["epistemic_boundary"].__setitem__("fabricated_tool_results", "allow"))
        result = self.run_validator()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("fabricated tool results", result.stderr)

    def test_child_privilege_expansion_is_rejected(self):
        self.mutate(lambda x: x["composition"].__setitem__("effective_child_policy", "union-with-parent"))
        result = self.run_validator()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("intersect parent", result.stderr)

    def test_budget_exhaustion_cannot_expand_permission(self):
        self.mutate(lambda x: x["budget"].__setitem__("may_expand_permission_after_exhaustion", True))
        result = self.run_validator()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("cannot expand permission", result.stderr)


if __name__ == "__main__":
    unittest.main()
