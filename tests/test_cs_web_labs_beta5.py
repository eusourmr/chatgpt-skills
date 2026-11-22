"""Source/ZIP checks for the beta.5 candidate; not ChatGPT semantic host tests."""
import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "plugins/cs-navigator-web-labs"
SCRIPT = ROOT / "scripts/build-cs-web-labs-beta5.py"

class WebLabsBeta5(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        cls.a = Path(cls.tmp.name) / "one" / "candidate.zip"
        cls.b = Path(cls.tmp.name) / "two" / "candidate.zip"
        for dest in (cls.a, cls.b):
            subprocess.run([sys.executable, str(SCRIPT), "--output", str(dest)],
                           check=True, text=True, capture_output=True)
        with zipfile.ZipFile(cls.a) as archive:
            cls.integrity = archive.testzip()
            cls.entries = {n.removeprefix("cs-navigator-web-labs/"): archive.read(n)
                           for n in archive.namelist()}

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def test_reproducible_zip_and_checksum(self):
        self.assertEqual(self.a.read_bytes(), self.b.read_bytes())
        self.assertIsNone(self.integrity)
        digest = hashlib.sha256(self.a.read_bytes()).hexdigest()
        self.assertEqual(self.a.with_suffix(".zip.sha256").read_text().split()[0], digest)

    def test_versioned_metadata_and_existing_app(self):
        m = json.loads(self.entries["plugin.json"])
        overlay = json.loads(self.entries[".codex-plugin/plugin.json"])
        app = json.loads(self.entries[".app.json"])
        self.assertEqual(m["version"], overlay["version"])
        self.assertEqual(m["version"], "0.20.0-beta.5")
        self.assertEqual(m["name"], "cs-navigator-web-labs")
        self.assertEqual(m["extensions"]["com.openai"]["apps"], "./.app.json")
        self.assertEqual(overlay["apps"], "./.app.json")
        self.assertEqual(len(app["apps"]), 1)
        self.assertEqual(next(iter(app["apps"].values()))["id"],
                         "asdk_app_6aee1bad0884819196a97a44393e1a53")

    def test_no_seventh_skill_no_portable_mcp(self):
        self.assertEqual(len(self.entries), 14)
        self.assertEqual(sum(k.endswith("/SKILL.md") for k in self.entries), 6)
        self.assertNotIn("mcp.json", self.entries)
        self.assertNotIn(".mcp.json", self.entries)
        self.assertNotIn("mcpServers", json.loads(self.entries[".codex-plugin/plugin.json"]))

    def test_other_specialists_unchanged(self):
        for name in ("academic-writing-labs", "document-compliance-labs",
                     "engineering-investigator-labs", "text-integrity-labs",
                     "ux-quality-gate-labs"):
            p = f"skills/{name}/SKILL.md"
            self.assertEqual(self.entries[p], (BASE / p).read_bytes())

    def test_curator_method_and_activation_limits(self):
        curator = self.entries["skills/cs-navigator-labs/SKILL.md"].decode()
        method = self.entries["skills/cs-navigator-labs/references/PROMPT_ENGINEERING.md"].decode()
        playbook = self.entries["skills/cs-navigator-labs/references/ROUTING_PLAYBOOK.md"].decode()
        self.assertIn("0.20.0-beta.5", curator)
        self.assertIn("Engenharia contextual de prompts", curator)
        self.assertIn("competência transversal", curator)
        self.assertIn("Não substitua a entrega", curator)
        self.assertIn("PROMPT_ENGINEERING.md", playbook)
        self.assertIn("PC02-08", method)

    def test_honest_evidence_and_separation(self):
        q = json.loads(self.entries["QUALIFICATION-MANIFEST.json"])
        self.assertEqual(q["version"], "0.20.0-beta.5")
        self.assertFalse(q["native_host_invocation_tested"])
        self.assertFalse(q["combined_plugin_host_invocation_tested"])
        self.assertFalse(q["candidate_host_accepted"])
        self.assertEqual(q["pc02_host_cases_executed"], 0)
        self.assertEqual(q["umnoo_integration"], "disabled_not_integrated")
        self.assertEqual(q["skill_count"], 6)
        for path, digest in q["files"].items():
            self.assertEqual(hashlib.sha256(self.entries[path]).hexdigest(), digest)

    def test_baseline_is_still_available_for_regressions(self):
        self.assertEqual(json.loads((BASE / "plugin.json").read_text())["version"], "0.20.0-beta.4")
        self.assertEqual(json.loads((ROOT / "plugins/cs-navigator/plugin.json").read_text())["version"], "0.17.0")
        self.assertEqual(json.loads((ROOT / "plugins/cs-navigator-labs/plugin.json").read_text())["version"], "0.20.0-beta.3")

if __name__ == "__main__":
    unittest.main()
