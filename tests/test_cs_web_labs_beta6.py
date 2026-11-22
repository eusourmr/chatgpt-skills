"""Beta.6 source regression and reproducibility; host behavior remains separate."""
import hashlib, importlib.util, json, tempfile, unittest, zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("cs_beta6",ROOT/"scripts/build-cs-web-labs-beta6.py")
builder=importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)

class Beta6NaturalUse(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.files=builder.entries()
    def test_six_skills_existing(self):
        self.assertEqual(sum(p.endswith("/SKILL.md") for p in self.files),6)
        self.assertEqual(len(self.files),14)
    def test_app_registry_preserved(self):
        app=json.loads(self.files[".app.json"])
        self.assertEqual(next(iter(app["apps"].values()))["id"],
            "asdk_app_6aee1bad0884819196a97a44393e1a53")
        self.assertNotIn("mcp.json",self.files)
        self.assertNotIn(".mcp.json",self.files)
    def test_version_consistency(self):
        a=json.loads(self.files["plugin.json"])
        b=json.loads(self.files[".codex-plugin/plugin.json"])
        q=json.loads(self.files["QUALIFICATION-MANIFEST.json"])
        self.assertEqual((a["version"],b["version"],q["version"]),("0.20.0-beta.6",)*3)
        self.assertEqual(q["natural_host_cases_executed"],0)
        self.assertFalse(q["candidate_host_accepted"])
    def test_actual_web_uri_not_portable_labs_hardcoded(self):
        cur=self.files["skills/cs-navigator-labs/SKILL.md"].decode()
        self.assertIn("exact specialist URI returned by the host skill inventory",cur)
        self.assertNotIn("skills://plugins/cs-navigator-labs/<name>/skill.md",cur)
        self.assertIn("explicitly requested host activation audit",cur)
    def test_native_first_and_non_noisy(self):
        cur=self.files["skills/cs-navigator-labs/SKILL.md"].decode()
        self.assertIn("keep routing, skills and Registry invisible",cur)
        self.assertIn("Do not run diagnostics on every new conversation",cur)
        self.assertIn("actual question",cur)
    def test_quality_hashes(self):
        q=json.loads(self.files["QUALIFICATION-MANIFEST.json"])
        for path,digest in q["files"].items():
            self.assertEqual(hashlib.sha256(self.files[path]).hexdigest(),digest)
    def test_other_specialists_unchanged_from_beta5(self):
        src=builder.base.archive_entries()
        for p in src:
            if p.endswith("/SKILL.md") and "cs-navigator-labs" not in p:
                self.assertEqual(self.files[p],src[p])
    def test_reproducibility(self):
        with tempfile.TemporaryDirectory() as temp:
            a=Path(temp)/"a"/"candidate.zip"
            b=Path(temp)/"b"/"candidate.zip"
            builder.build(a)
            builder.build(b)
            self.assertEqual(a.read_bytes(),b.read_bytes())
            digest=hashlib.sha256(a.read_bytes()).hexdigest()
            self.assertEqual(a.with_name(a.name+".sha256").read_text().split()[0],digest)
            with zipfile.ZipFile(a) as zip_:
                self.assertIsNone(zip_.testzip())
    def test_separation(self):
        q=json.loads(self.files["QUALIFICATION-MANIFEST.json"])
        self.assertEqual(q["umnoo_integration"],"disabled_not_integrated")
        self.assertEqual(q["pc02_host_cases_executed"],0)

if __name__=="__main__":unittest.main()
