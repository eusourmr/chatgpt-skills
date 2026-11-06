"""Source-bound checks for web-only CS Navigator Labs variant. Not a host test."""
import hashlib
import json
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PACKAGE=ROOT/"plugins"/"cs-navigator-web-labs"

class WebLabsContract(unittest.TestCase):
    def test_registered_app_only_no_portable_mcp(self):
        self.assertFalse((PACKAGE/"mcp.json").exists())
        self.assertFalse((PACKAGE/".mcp.json").exists())
        manifest=json.loads((PACKAGE/"plugin.json").read_text())
        overlay=json.loads((PACKAGE/".codex-plugin/plugin.json").read_text())
        app=json.loads((PACKAGE/".app.json").read_text())
        self.assertEqual(manifest["name"],"cs-navigator-web-labs")
        self.assertEqual(manifest["version"],"0.20.0-beta.4")
        self.assertEqual(overlay["version"],manifest["version"])
        self.assertEqual(manifest["extensions"]["com.openai"]["apps"],"./.app.json")
        self.assertEqual(overlay["apps"],"./.app.json")
        self.assertNotIn("mcpServers",overlay)
        self.assertEqual(len(app["apps"]),1)
        self.assertEqual(next(iter(app["apps"].values()))["id"],"asdk_app_6aee1bad0884819196a97a44393e1a53")
        self.assertEqual(manifest["extensions"]["com.openai"]["onboardingSkill"],"./skills/cs-navigator-labs/SKILL.md")
    def test_six_preserved_skills(self):
        q=json.loads((PACKAGE/"QUALIFICATION-MANIFEST.json").read_text())
        names={p.parent.name for p in (PACKAGE/"skills").glob("*/SKILL.md")}
        self.assertEqual(len(names),6)
        self.assertEqual(names,{"cs-navigator-labs","academic-writing-labs","document-compliance-labs","engineering-investigator-labs","text-integrity-labs","ux-quality-gate-labs"})
        self.assertFalse(q["mcp_config_present"])
        self.assertFalse(q["combined_plugin_host_invocation_tested"])
        self.assertFalse(q["native_host_invocation_tested"])
        for filename,digest in q["files"].items():
            self.assertTrue(filename.startswith("skills/"))
            self.assertEqual(hashlib.sha256((PACKAGE/filename).read_bytes()).hexdigest(),digest,filename)
        curator=(PACKAGE/"skills/cs-navigator-labs/SKILL.md").read_text()
        self.assertIn("0.20.0-beta.4",curator)
    def test_registry_exclusions_and_production_still_intact(self):
        stable=json.loads((ROOT/"plugins/cs-navigator/plugin.json").read_text())
        self.assertEqual(stable["version"],"0.17.0")
        base=json.loads((ROOT/"plugins/cs-navigator-labs/plugin.json").read_text())
        self.assertEqual(base["version"],"0.20.0-beta.3")
        registry=json.loads((ROOT/"registry/public-capabilities-v1.json").read_text())
        by_id={c["id"]:c for c in registry["entries"]}
        for identifier in ("medical-appointment-prep","caregiver-coordinator"):
            self.assertEqual(by_id[identifier]["distribution_state"],"excluded")
    def test_no_false_host_claim(self):
        record=json.loads((ROOT/"trust/qualification/pilots/host-03-web-surface-mcp-isolation-2026-11-06.json").read_text())
        self.assertEqual(record["host_acceptance"]["state"],"pending_new_chat")
        self.assertTrue(record["host_acceptance"]["cannot_infer_from_source_only"])
        self.assertEqual(record["skill_status_promotions"],0)
if __name__=="__main__":unittest.main()
