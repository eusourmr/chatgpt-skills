"""Regression for canonical Web Labs source after the beta.9 semantic-quality upgrade.

Historical beta.8 builders remain runnable for rollback. Tests verify precisely
approved differences, source digests and reproducible beta.9 output; they do
not claim the ChatGPT host has executed the six specialists.
"""
import hashlib
import importlib.util
import json
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def module(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    result = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(result)
    return result


old = module("beta8_legacy", "scripts/build-cs-web-labs-beta8.py")
flat = module("web_current_flat", "scripts/build-cs-web-labs-current.py")
NEW = {
    "skills/cs-navigator-labs/references/SEMANTIC_QUALITY_CYCLE.md",
    "skills/cs-navigator-labs/knowledge/semantic-quality-v1.json",
}
METADATA = {"plugin.json", ".codex-plugin/plugin.json", "QUALIFICATION-MANIFEST.json", "README.md"}


class CanonicalWebBuilder(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.before = old.entries()
        cls.after = flat.source_files()

    def test_exact_inventory_and_existing_specialist_contents(self):
        self.assertEqual(set(self.after) - set(self.before), NEW)
        self.assertEqual(len(self.before), 19)
        self.assertEqual(len(self.after), 21)
        self.assertEqual(sum(path.endswith("/SKILL.md") for path in self.after), 6)
        for path, content in self.before.items():
            if path.endswith("/SKILL.md"):
                if path == "skills/cs-navigator-labs/SKILL.md":
                    content = content.replace(b"version `0.20.0-beta.8`;", b"version `0.20.0-beta.9`;")
                self.assertTrue(self.after[path].startswith(content.rstrip()), path)
                self.assertIn(b"CS-SQ-01", self.after[path], path)
            elif path not in METADATA:
                self.assertEqual(self.after[path], content, path)

    def test_version_manifest_registry_and_safety(self):
        q = json.loads(self.after["QUALIFICATION-MANIFEST.json"])
        self.assertEqual(q["version"], "0.20.0-beta.9")
        self.assertEqual(q["skill_count"], 6)
        self.assertEqual(q["semantic_quality_skills_reviewed"], 6)
        self.assertEqual(q["semantic_quality_host_cases_executed"], 0)
        self.assertFalse(q["candidate_host_accepted"])
        self.assertEqual(q["umnoo_integration"], "disabled_not_integrated")
        for path, expected in q["files"].items():
            self.assertEqual(hashlib.sha256(self.after[path]).hexdigest(), expected, path)
        for path in ("plugin.json", ".codex-plugin/plugin.json"):
            self.assertEqual(json.loads(self.after[path])["version"], q["version"])
        self.assertEqual(self.after[".app.json"], self.before[".app.json"])
        self.assertIn(b"canivete su", self.after["README.md"])

    def test_beta9_archive_reproducible_and_rollback_intact(self):
        with tempfile.TemporaryDirectory() as tmp:
            before = Path(tmp) / "old" / "beta8.zip"
            a = Path(tmp) / "newA" / "beta9.zip"
            b = Path(tmp) / "newB" / "beta9.zip"
            old.build(before)
            flat.build(a)
            flat.build(b)
            self.assertEqual(a.read_bytes(), b.read_bytes())
            self.assertNotEqual(a.read_bytes(), before.read_bytes())
            sha = hashlib.sha256(a.read_bytes()).hexdigest()
            self.assertEqual(a.with_name(a.name + ".sha256").read_text().split()[0], sha)
            with zipfile.ZipFile(a) as archive:
                self.assertIsNone(archive.testzip())
                self.assertEqual(len(archive.namelist()), 21)

    def test_rejects_tampered_manifest_and_wrong_app(self):
        data = dict(self.after)
        q = json.loads(data["QUALIFICATION-MANIFEST.json"])
        q["candidate_host_accepted"] = True
        data["QUALIFICATION-MANIFEST.json"] = json.dumps(q).encode()
        with self.assertRaisesRegex(ValueError, "Cannot promote host"):
            flat.validate(data)
        data = dict(self.after, **{".app.json": b'{"apps":{}}'})
        with self.assertRaises((ValueError, KeyError)):
            flat.validate(data)


if __name__ == "__main__":
    unittest.main()
