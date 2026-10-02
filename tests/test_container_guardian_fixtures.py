import json
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GUARDIAN = ROOT / "runtime" / "container-guardian.mjs"
FIXTURES = ROOT / "tests" / "fixtures" / "container-guardian" / "adversarial-cases.json"


class ContainerGuardianFixtureTests(unittest.TestCase):
    def test_adversarial_fixture_suite(self):
        suite = json.loads(FIXTURES.read_text(encoding="utf-8"))
        self.assertEqual(suite["schema_version"], 1)
        self.assertGreaterEqual(len(suite["cases"]), 8)

        for case in suite["cases"]:
            with self.subTest(case=case["id"]):
                result = subprocess.run(
                    ["node", str(GUARDIAN)],
                    cwd=ROOT,
                    input=json.dumps(case["input"]),
                    text=True,
                    capture_output=True,
                    check=False,
                )
                self.assertEqual(result.returncode, 0, result.stderr)
                output = json.loads(result.stdout)
                expected = case["expected"]
                self.assertEqual(output["decision"], expected["decision"])
                self.assertEqual(output["reason_code"], expected["reason_code"])
                self.assertEqual(output["stop_code"], expected["stop_code"])


if __name__ == "__main__":
    unittest.main()
