"""Tests for original semantic-quality method embedded in all six Web Skills.

These tests prove source integrity, preservation of prior contracts and accurate
qualification labels, not behavioral superiority or automatic host invocation.
"""
import hashlib
import json
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PLUGIN=ROOT/"plugins/cs-navigator-web-labs-current"
SKILLS=["cs-navigator-labs","academic-writing-labs","document-compliance-labs",
        "engineering-investigator-labs","text-integrity-labs","ux-quality-gate-labs"]

class SemanticQualityCoverage(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.files={name:(PLUGIN/"skills"/name/"SKILL.md").read_text(encoding="utf-8") for name in SKILLS}
        cls.q=json.loads((PLUGIN/"QUALIFICATION-MANIFEST.json").read_text(encoding="utf-8"))
        cls.matrix=json.loads((PLUGIN/"skills/cs-navigator-labs/knowledge/semantic-quality-v1.json").read_text(encoding="utf-8"))

    def test_all_six_profiles_and_four_movements(self):
        self.assertEqual(len(SKILLS),len(set(SKILLS)))
        for name,source in self.files.items():
            self.assertIn("CS-SQ-01",source,name)
            for movement in ("Compreender", "Executar", "Avaliar", "Corrigir seletivamente"):
                self.assertIn(movement,source,name)
            self.assertIn("tarefas simples",source.lower(),name)
        self.assertEqual(set(self.matrix["profiles"]),set(SKILLS))
        self.assertEqual(self.matrix["method"],"understand_execute_evaluate_selectively_correct")

    def test_existing_specialist_invariants_preserved(self):
        self.assertIn("NBR 14724:2024",self.files["academic-writing-labs"])
        self.assertIn("UNKNOWN / EVIDENCE MISSING",self.files["document-compliance-labs"])
        self.assertIn("rollback",self.files["engineering-investigator-labs"])
        self.assertIn("ATENÇÃO — MUDANÇA SUBSTANTIVA DE SIGNIFICADO",self.files["text-integrity-labs"])
        self.assertIn("Design System Studio",self.files["ux-quality-gate-labs"])
        self.assertIn("Registry MCP",self.files["cs-navigator-labs"])
        self.assertIn("version `0.20.0-beta.9`;",self.files["cs-navigator-labs"])

    def test_quality_matrix_is_our_own_without_personal_attribution(self):
        cycle=(PLUGIN/"skills/cs-navigator-labs/references/SEMANTIC_QUALITY_CYCLE.md").read_text(encoding="utf-8")
        self.assertIn("CS Navigator",cycle)
        self.assertIn("proporcional",cycle)
        self.assertIn("permissões",cycle)
        self.assertNotIn("Allison Harbin",cycle)
        self.assertNotIn("Allison Harbin",json.dumps(self.matrix))
        self.assertFalse(self.matrix["host_behavior_verified"])
        self.assertEqual(self.matrix["host_cases_executed"],0)
        self.assertFalse(self.matrix["learning_weights_modified"])

    def test_manifest_and_plugin_metadata_are_consistent(self):
        self.assertEqual(self.q["version"],"0.20.0-beta.9")
        self.assertEqual(self.q["semantic_quality_skills_reviewed"],6)
        self.assertEqual(self.q["semantic_quality_host_cases_executed"],0)
        self.assertFalse(self.q["candidate_host_accepted"])
        self.assertEqual(self.q["skill_count"],6)
        self.assertEqual(self.q["umnoo_integration"],"disabled_not_integrated")
        for name,expected in self.q["files"].items():
            self.assertEqual(hashlib.sha256((PLUGIN/name).read_bytes()).hexdigest(),expected,name)
        for name in ("plugin.json",".codex-plugin/plugin.json"):
            self.assertEqual(json.loads((PLUGIN/name).read_text(encoding="utf-8"))["version"],self.q["version"])
        app=json.loads((PLUGIN/".app.json").read_text(encoding="utf-8"))
        self.assertEqual(len(app["apps"]),1)
        self.assertEqual(next(iter(app["apps"].values()))["id"],"asdk_app_6aee1bad0884819196a97a44393e1a53")

    def test_no_new_skill_or_mcp_and_principle_is_not_neural_training(self):
        names=list((PLUGIN/"skills").glob("*/SKILL.md"))
        self.assertEqual(len(names),6)
        self.assertFalse((PLUGIN/"mcp.json").exists())
        self.assertFalse((PLUGIN/".mcp.json").exists())
        self.assertTrue(self.matrix["nature"].startswith("original_cs_navigator"))
        self.assertIn("sem",self.files["cs-navigator-labs"].lower())
        self.assertFalse(self.matrix["permissions_expanded"])


if __name__=="__main__":
    unittest.main()
