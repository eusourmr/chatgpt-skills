import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCANNER = ROOT / "scripts" / "security-gate-v2.mjs"

BLOCKING_FIXTURES = {
    "prompt-injection": "prompt-injection",
    "remote-execution": "remote-execution",
    "destructive-operation": "destructive-operation",
    "obfuscation": "obfuscation",
    "secret-exfiltration": "secret-exfiltration",
    "process-execution": "process-execution",
    "lifecycle-hook": "lifecycle-hook",
}


class SecurityGateV2Tests(unittest.TestCase):
    def run_fixture(self, name):
        return subprocess.run(
            [
                "node",
                str(SCANNER),
                "--path",
                str(ROOT / "tests" / "fixtures" / "security-v2" / name),
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_benign_fixture_passes(self):
        result = self.run_fixture("benign")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn('"result": "pass"', result.stdout)

    def test_each_blocking_family_is_rejected(self):
        for fixture, family in BLOCKING_FIXTURES.items():
            with self.subTest(fixture=fixture):
                result = self.run_fixture(fixture)
                self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
                self.assertIn(f'"family": "{family}"', result.stdout)
                self.assertIn('"blocking": true', result.stdout)


if __name__ == "__main__":
    unittest.main()
