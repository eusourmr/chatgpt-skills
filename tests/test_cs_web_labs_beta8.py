"""Structural beta.8 QA. These are not ChatGPT semantic host tests."""
import hashlib, importlib.util, json, tempfile, unittest, zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("cs_beta8",ROOT/"scripts/build-cs-web-labs-beta8.py")
builder=importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)
CASES=ROOT/"trust/qualification/curation/cases-beta8.json"

class CuratorialBeta8(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.files=builder.entries()
        cls.prev=builder.base.entries()
        cls.curator=cls.files[builder.CURATOR].decode()
        cls.ledger=json.loads(cls.files[builder.LEDGER])
        cls.q=json.loads(cls.files["QUALIFICATION-MANIFEST.json"])
        cls.cases=json.loads(CASES.read_text(encoding="utf-8"))

    def test_six_skills_and_five_specialists_untouched(self):
        self.assertEqual(sum(p.endswith("/SKILL.md") for p in self.files),6)
        self.assertEqual(len(self.files),19)
        for p,v in self.prev.items():
            if p.endswith("/SKILL.md") and p != builder.CURATOR:
                self.assertEqual(self.files[p],v,p)

    def test_curator_version_fixed_and_knowledge_linked(self):
        self.assertIn("version "+chr(96)+"0.20.0-beta.8"+chr(96)+";",self.curator)
        self.assertNotIn("read the corresponding "+chr(96)+"the exact specialist URI",self.curator)
        self.assertIn("read the specialist instructions at the exact skill URI exposed by the host",self.curator)
        self.assertIn("knowledge/curation-knowledge.json",self.curator)
        self.assertIn("references/CURATION_DECISIONS.md",self.curator)

    def test_no_false_learning_or_host_claims(self):
        self.assertFalse(self.q["candidate_host_accepted"])
        self.assertEqual(self.q["curation_host_cases_executed"],0)
        self.assertEqual(self.q["curation_knowledge_state"],"source_reviewed_not_host_behavior_validated")
        self.assertEqual(self.q["umnoo_integration"],"disabled_not_integrated")
        self.assertEqual(self.ledger["activation_contract"]["umnoo_bridge"],"disabled_not_integrated")
        self.assertTrue(self.ledger["activation_contract"]["host_skill_read_required_to_claim_application"])

    def test_registry_notice_and_six_skills_preserved(self):
        self.assertEqual(self.files[".app.json"],self.prev[".app.json"])
        self.assertEqual(self.files[builder.NOTICE],self.prev[builder.NOTICE])
        self.assertNotIn("mcp.json",self.files)
        self.assertNotIn(".mcp.json",self.files)
        app=json.loads(self.files[".app.json"])
        self.assertEqual(next(iter(app["apps"].values()))["id"],"asdk_app_6aee1bad0884819196a97a44393e1a53")

    def test_nine_rules_include_provenance_and_negative_gates(self):
        rules=self.ledger["rules"]
        self.assertEqual(len(rules),9)
        self.assertEqual(len({r["id"] for r in rules}),9)
        sources={s["id"] for s in self.ledger["source_reviews"]}
        skills={p.split("/")[1] for p in self.files if p.endswith("/SKILL.md")}
        for r in rules:
            self.assertTrue(r["id"].startswith("CUR-"))
            self.assertTrue(r["intent_examples"])
            self.assertTrue(r["skip_if"] and r["evidence_required"])
            self.assertEqual(r["status"],"source_reviewed_not_host_behavior_validated")
            self.assertTrue(set(r["source_ids"]).issubset(sources))
            self.assertTrue(set(r["specialists"]).issubset(skills))

    def test_native_and_external_studio_are_not_faked(self):
        rules={r["id"]:r for r in self.ledger["rules"]}
        self.assertEqual(rules["CUR-NATIVE-01"]["specialists"],[])
        self.assertEqual(rules["CUR-DS-01"]["choose"],"native_or_verified_external")
        self.assertEqual(rules["CUR-DS-01"]["specialists"],[])
        self.assertEqual(rules["CUR-CROSS-01"]["choose"],"composite_if_material")
        self.assertEqual(rules["CUR-ENG-01"]["specialists"],["engineering-investigator-labs"])
        self.assertTrue(self.ledger["activation_contract"]["no_registry_on_trivial_tasks"])

    def test_upstream_revision_and_license_anchors(self):
        sources={s["id"]:s for s in self.ledger["source_reviews"]}
        self.assertEqual(sources["UXPM"]["license"],"MIT")
        self.assertEqual(sources["UNSLOP"]["license"],"CC BY 4.0")
        self.assertEqual(sources["UXPM"]["commit"],"281e4537afb11333ac9947783779aaf314ebfbf2")
        self.assertEqual(sources["UNSLOP"]["commit"],"620163eedb3529d9cd23a3994ed8d287d06f760d")
        self.assertIn("Damir Sokolovsky",self.files[builder.NOTICE].decode())

    def test_twelve_synthetic_cases_not_misrepresented(self):
        self.assertEqual(self.cases["version"],"0.20.0-beta.8")
        self.assertEqual(self.cases["status"],"not_run_in_chatgpt_host")
        self.assertTrue(self.cases["inputs_are_synthetic"])
        tests=self.cases["cases"]
        self.assertGreaterEqual(len(tests),12)
        self.assertEqual(len({c["id"] for c in tests}),len(tests))
        self.assertEqual({c["rule_id"] for c in tests},{r["id"] for r in self.ledger["rules"]})
        self.assertTrue(all(c["host_observed"] is False for c in tests))

    def test_manifest_hashes_and_versions(self):
        self.assertEqual(self.q["version"],"0.20.0-beta.8")
        self.assertEqual(self.q["skill_count"],6)
        self.assertEqual(self.q["curation_knowledge_rules"],9)
        for p,sha in self.q["files"].items():
            self.assertEqual(hashlib.sha256(self.files[p]).hexdigest(),sha,p)
        for p in ("plugin.json",".codex-plugin/plugin.json"):
            self.assertEqual(json.loads(self.files[p])["version"],"0.20.0-beta.8")

    def test_archive_reproducibility(self):
        with tempfile.TemporaryDirectory() as tmp:
            a=Path(tmp)/"a"/"plugin.zip"
            b=Path(tmp)/"b"/"plugin.zip"
            builder.build(a); builder.build(b)
            self.assertEqual(a.read_bytes(),b.read_bytes())
            self.assertEqual(a.with_name(a.name+".sha256").read_text().split()[0],hashlib.sha256(a.read_bytes()).hexdigest())
            with zipfile.ZipFile(a) as z:
                self.assertIsNone(z.testzip())
                self.assertEqual(len(z.namelist()),19)
                self.assertIn("cs-navigator-web-labs/"+builder.LEDGER,z.namelist())
if __name__=="__main__": unittest.main()
