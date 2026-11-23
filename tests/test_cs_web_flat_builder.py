"""Verify the new flat-source Web Labs builder and original beta.8 are identical.

This is source/package regression, NOT a ChatGPT host activation test.
"""
import hashlib
import importlib.util
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def module(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    x = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(x)
    return x

old = module("beta8_legacy", "scripts/build-cs-web-labs-beta8.py")
flat = module("web_current_flat", "scripts/build-cs-web-labs-current.py")

class CanonicalWebBuilder(unittest.TestCase):
    def test_canonical_source_preserves_all_skill_bytes_and_json_semantics(self):
        original = old.entries()
        current = flat.source_files()
        self.assertEqual(set(original), set(current))
        self.assertEqual(len(current), 19)
        import json
        for p in original:
            if p.endswith(".json"):
                self.assertEqual(json.loads(original[p]), json.loads(current[p]), p)
            else:
                self.assertEqual(original[p], current[p], p)
    def test_canonical_zip_is_deterministic_and_semantically_legacy_equivalent(self):
        with tempfile.TemporaryDirectory() as tmp:
            a=Path(tmp)/"legacy.zip"
            b=Path(tmp)/"canonical.zip"
            c=Path(tmp)/"repeat.zip"
            old.build(a)
            flat.build(b)
            flat.build(c)
            import json
            with zipfile.ZipFile(a) as old_zip, zipfile.ZipFile(b) as new_zip:
                self.assertEqual(set(old_zip.namelist()),set(new_zip.namelist()))
                for p in old_zip.namelist():
                    old_data,new_data=old_zip.read(p),new_zip.read(p)
                    if p.endswith(".json"):
                        self.assertEqual(json.loads(old_data),json.loads(new_data),p)
                    else:
                        self.assertEqual(old_data,new_data,p)
            self.assertEqual(b.read_bytes(), c.read_bytes())
            self.assertEqual(hashlib.sha256(b.read_bytes()).hexdigest(), b.with_name(b.name+".sha256").read_text().split()[0])
            with zipfile.ZipFile(b) as z:
                self.assertIsNone(z.testzip())
                self.assertEqual(len(z.namelist()),19)
    def test_rejects_tampered_manifest_and_rebrand(self):
        files = flat.source_files()
        import json
        manifest=json.loads(files["QUALIFICATION-MANIFEST.json"])
        manifest["candidate_host_accepted"]=True
        altered=dict(files,**{"QUALIFICATION-MANIFEST.json":json.dumps(manifest).encode()})
        with self.assertRaisesRegex(ValueError,"Cannot promote host"):
            flat.validate(altered)
        altered=dict(files)
        altered[".app.json"]=b'{"apps":{}}'
        with self.assertRaises((ValueError, KeyError)):
            flat.validate(altered)

if __name__=="__main__":
    unittest.main()
