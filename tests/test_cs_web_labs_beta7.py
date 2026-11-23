"""Source and packaging tests for CS Web Labs beta.7, not host behavioral tests."""
import hashlib
import importlib.util
import json
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("cs_web_beta7", ROOT / "scripts/build-cs-web-labs-beta7.py")
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class Beta7UpstreamReview(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.entries = builder.entries()
        cls.prior = builder.base.entries()
        cls.ux = cls.entries[builder.UX_SKILL].decode("utf-8")
        cls.copy = cls.entries[builder.TEXT_SKILL].decode("utf-8")
        cls.notice = cls.entries[builder.NOTICE].decode("utf-8")

    def test_no_seventh_skill_and_source_boundary(self):
        self.assertEqual(sum(k.endswith("/SKILL.md") for k in self.entries), 6)
        self.assertEqual(len(self.entries), 17)
        self.assertNotIn("mcp.json", self.entries)
        self.assertNotIn(".mcp.json", self.entries)
        self.assertEqual(self.entries[".app.json"], self.prior[".app.json"])
        self.assertEqual(json.loads(self.entries["plugin.json"])["name"], "cs-navigator-web-labs")

    def test_unchanged_four_other_specialists(self):
        for key, value in self.prior.items():
            if key.endswith("/SKILL.md") and key not in (builder.UX_SKILL, builder.TEXT_SKILL):
                self.assertEqual(self.entries[key], value, key)

    def test_ux_additions_are_context_dependent(self):
        for token in ("Existing UI adequate", "isolated defects", "systemic problems",
                      "product", "Nine checks", "stack", "RTL", "IME",
                      "accessibility", "mock data"):
            self.assertIn(token.lower(), self.ux.lower(), token)
        self.assertIn("Do not fabricate problems", self.ux)
        self.assertIn("Design System Studio", self.ux)
        self.assertIn("not a copied skill", self.ux)
        self.assertTrue(self.entries[builder.UX_REF].startswith(b"# UX Quality Gate"))

    def test_text_invariants_survive_microcopy_addition(self):
        for original in ("ATENÇÃO — MUDANÇA SUBSTANTIVA DE SIGNIFICADO",
                         "VERSÃO ALTERNATIVA — NÃO É CORREÇÃO GRAMATICAL",
                         "Regression TEXT-02", "poderá", "garantido"):
            self.assertIn(original, self.copy)
        for token in ("Claim ledger", "illustrative", "Error copy", "accessible field labels",
                      "same intent", "author's control", "warning"):
            self.assertIn(token.lower(), self.copy.lower())
        self.assertTrue(self.entries[builder.TEXT_REF].startswith(b"# UI Copy Integrity"))

    def test_evidence_and_permissions_do_not_fake_host(self):
        self.assertIn("not tested", self.ux)
        self.assertIn("do not describe screenshots", self.ux.lower())
        self.assertIn("If tests were not executed", self.ux)
        self.assertIn("not a product change", self.entries[builder.TEXT_REF].decode())
        q = json.loads(self.entries["QUALIFICATION-MANIFEST.json"])
        self.assertFalse(q["candidate_host_accepted"])
        self.assertEqual(q["upstream_review_host_cases_executed"], 0)
        self.assertFalse(q["third_party_code_imported"])
        self.assertEqual(q["umnoo_integration"], "disabled_not_integrated")

    def test_attribution_and_version_pins(self):
        for token in ("Next Level Builder", "MIT", "Damir Sokolovsky", "CC BY 4.0",
                      "281e4537afb11333ac9947783779aaf314ebfbf2",
                      "620163eedb3529d9cd23a3994ed8d287d06f760d"):
            self.assertIn(token, self.notice)
        self.assertIn("No external SKILL.md", self.notice)
        self.assertIn("NOTICE-UX-SOURCES.md", self.ux)
        self.assertIn("NOTICE-UX-SOURCES.md", self.copy)

    def test_references_in_manifest_have_exact_digests(self):
        q = json.loads(self.entries["QUALIFICATION-MANIFEST.json"])
        self.assertEqual(q["version"], "0.20.0-beta.7")
        self.assertEqual(q["skill_count"], 6)
        self.assertEqual(q["third_party_source_notice"], builder.NOTICE)
        for name, digest in q["files"].items():
            self.assertEqual(hashlib.sha256(self.entries[name]).hexdigest(), digest, name)

    def test_plugin_metadata_and_ui_are_versioned(self):
        p = json.loads(self.entries["plugin.json"])
        c = json.loads(self.entries[".codex-plugin/plugin.json"])
        self.assertEqual(p["version"], c["version"])
        self.assertEqual(p["version"], "0.20.0-beta.7")
        self.assertEqual(p["extensions"]["com.openai"]["apps"], "./.app.json")
        self.assertEqual(c["apps"], "./.app.json")
        self.assertNotIn("mcpServers", c)

    def test_binary_zip_is_identical_across_builds(self):
        with tempfile.TemporaryDirectory() as folder:
            a = Path(folder) / "a" / "plugin.zip"
            b = Path(folder) / "b" / "plugin.zip"
            builder.build(a)
            builder.build(b)
            self.assertEqual(a.read_bytes(), b.read_bytes())
            digest = hashlib.sha256(a.read_bytes()).hexdigest()
            self.assertEqual(a.with_name(a.name + ".sha256").read_text().split()[0], digest)
            with zipfile.ZipFile(a) as z:
                self.assertIsNone(z.testzip())
                self.assertEqual(len(z.namelist()), 17)


if __name__ == "__main__":
    unittest.main()
