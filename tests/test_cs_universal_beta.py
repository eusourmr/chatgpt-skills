"""Source-only, fail-closed tests for CS Navigator Labs Universal Beta."""
import hashlib
import json
import re
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PLUGIN=ROOT/"plugins"/"cs-navigator-labs"
SKILLS=PLUGIN/"skills"

def read(rel):
    return (PLUGIN/rel).read_text(encoding="utf-8")

class UniversalBetaContractTests(unittest.TestCase):
    def test_identity_release_and_onboarding_prompt(self):
        a=json.loads(read("plugin.json"))
        b=json.loads(read(".codex-plugin/plugin.json"))
        q=json.loads(read("QUALIFICATION-MANIFEST.json"))
        self.assertEqual(a["name"],"cs-navigator-labs")
        self.assertEqual(a["version"],"0.20.0-beta.3")
        self.assertEqual(a["version"],b["version"])
        self.assertEqual(a["version"],q["version"])
        self.assertEqual(a["extensions"]["com.openai"]["interface"]["defaultPrompt"],b["interface"]["defaultPrompt"])
        self.assertEqual(a["extensions"]["com.openai"]["interface"]["displayName"],b["interface"]["displayName"])
        self.assertNotIn("nao conecta servidor MCP",read("plugin.json").lower())
    def test_six_skills_and_source_hashes(self):
        q=json.loads(read("QUALIFICATION-MANIFEST.json"))
        names={p.parent.name for p in SKILLS.glob("*/SKILL.md")}
        self.assertEqual(names,{"academic-writing-labs","cs-navigator-labs","document-compliance-labs","engineering-investigator-labs","text-integrity-labs","ux-quality-gate-labs"})
        self.assertEqual(q["skill_count"],6)
        for name in names:
            src=SKILLS/name/"SKILL.md"
            body=src.read_text(encoding="utf-8")
            self.assertTrue(body.startswith("---\n"),name)
            self.assertRegex(body,rf"(?m)^name:\s*{re.escape(name)}\s*$")
            self.assertRegex(body,r"(?m)^description:\s*.+$")
        for rel,sha in q["files"].items():
            self.assertTrue(rel.startswith("skills/"))
            self.assertEqual(hashlib.sha256((PLUGIN/rel).read_bytes()).hexdigest(),sha,rel)
    def test_one_readonly_mcp_no_credentials(self):
        m=json.loads(read("mcp.json"))
        self.assertEqual(m["$schema"],"https://agent-plugins.org/schemas/1.0.0/mcp.schema.json")
        self.assertEqual(list(m["mcpServers"]),["cs-navigator-registry"])
        s=m["mcpServers"]["cs-navigator-registry"]
        self.assertEqual(s["type"],"streamable-http")
        self.assertEqual(s["url"],"https://chatgpt-skills.onrender.com/mcp")
        self.assertEqual(s["extensions"]["com.openai"]["auth"]["type"],"none")
        self.assertNotIn("apiKey",json.dumps(m))
        self.assertNotIn("clientSecret",json.dumps(m))
        self.assertTrue(json.loads(read("QUALIFICATION-MANIFEST.json"))["mcp_config_present"])
    def test_registered_registry_app_binding(self):
        p=json.loads(read("plugin.json"))
        o=json.loads(read(".codex-plugin/plugin.json"))
        q=json.loads(read("QUALIFICATION-MANIFEST.json"))
        app=json.loads(read(".app.json"))
        expected="asdk_app_6aee1bad0884819196a97a44393e1a53"
        self.assertEqual(p["extensions"]["com.openai"]["apps"],"./.app.json")
        self.assertEqual(o["apps"],"./.app.json")
        self.assertEqual(len(app["apps"]),1)
        self.assertEqual(next(iter(app["apps"].values()))["id"],expected)
        self.assertEqual(q["app_binding_id"],expected)
        self.assertTrue(q["standalone_registry_tool_call_verified_in_reviewer_session"])
        self.assertFalse(q["combined_plugin_host_invocation_tested"])
        self.assertFalse(q["native_host_invocation_tested"])

    def test_live_registry_does_not_execute_remote_skills(self):
        src=read("skills/cs-navigator-labs/SKILL.md")
        self.assertIn("metadata-only",src)
        self.assertIn("Never fetch/execute remote",src)
        self.assertIn("do not claim cross-chat",src.lower())
        self.assertIn("curate_user_goal",src)
        self.assertIn("experimental server-gated tools",src)
        self.assertNotIn("contains **no mcp.json**",src)
    def test_original_production_plugin_is_untouched(self):
        production=json.loads((ROOT/"plugins"/"cs-navigator"/"plugin.json").read_text(encoding="utf-8"))
        self.assertEqual(production["version"],"0.17.0")
        self.assertEqual(production["name"],"cs-navigator")
    def test_excluded_capabilities_remain_excluded(self):
        registry=json.loads((ROOT/"registry"/"public-capabilities-v1.json").read_text(encoding="utf-8"))
        by_id={x["id"]:x for x in registry["entries"]}
        for id in ("caregiver-coordinator","medical-appointment-prep"):
            self.assertEqual(by_id[id]["distribution_state"],"excluded")
    def test_no_claim_of_runtime_activation(self):
        q=json.loads(read("QUALIFICATION-MANIFEST.json"))
        self.assertIs(q["mcp_runtime_tested"],False)
        self.assertIs(q["native_host_invocation_tested"],False)
        readme=read("README.md")
        self.assertIn("tool activation",readme)
        self.assertIn("Runtime reachability",readme)
        self.assertNotIn("auto-installs GitHub",readme)

if __name__=="__main__":
    unittest.main()
