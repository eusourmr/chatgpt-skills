#!/usr/bin/env python3
"""Build private CS Navigator Web beta.8: versioned evidence-bounded curation knowledge."""
import argparse
import hashlib
import importlib.util
import json
import stat
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PREVIOUS = "0.20.0-beta.7"
VERSION = "0.20.0-beta.8"
OVERLAY = ROOT / "plugins" / "cs-navigator-web-labs-beta8"
BASE_BUILDER = ROOT / "scripts" / "build-cs-web-labs-beta7.py"
DEFAULT_OUT = ROOT / "dist" / ("cs-navigator-web-labs-" + VERSION + ".zip")
CURATOR = "skills/cs-navigator-labs/SKILL.md"
DECISIONS = "skills/cs-navigator-labs/references/CURATION_DECISIONS.md"
LEDGER = "skills/cs-navigator-labs/knowledge/curation-knowledge.json"
NOTICE = "NOTICE-UX-SOURCES.md"

spec = importlib.util.spec_from_file_location("cs_web_beta7_source", BASE_BUILDER)
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

def load_overlay(filename):
    p = OVERLAY / filename
    if not p.is_file() or p.is_symlink() or not p.resolve().is_relative_to(OVERLAY.resolve()):
        raise ValueError("Overlay not found or unsafe: " + filename)
    return p.read_bytes()

def replace_one(original, before, after):
    if original.count(before) != 1:
        raise ValueError("Expected one source match: " + before[:90])
    return original.replace(before, after, 1)

def serialize(value):
    return (json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2) + "\n").encode("utf-8")

def entries():
    f = base.entries()
    if len(f) != 17 or sum(p.endswith("/SKILL.md") for p in f) != 6:
        raise ValueError("Unreviewed beta.7 package inventory")
    app_before = f[".app.json"]
    notice_before = f[NOTICE]
    baseline_specialists = {p: content for p, content in f.items()
                            if p.endswith("/SKILL.md") and p != CURATOR}

    for name in ("plugin.json", ".codex-plugin/plugin.json"):
        manifest = json.loads(f[name])
        if manifest.get("version") != PREVIOUS:
            raise ValueError("Cannot apply beta.8 to wrong base version")
        manifest["version"] = VERSION
        display = (manifest["extensions"]["com.openai"]["interface"]
                   if name == "plugin.json" else manifest["interface"])
        display["shortDescription"] = "Curadoria natural e conhecimento verificavel"
        display["defaultPrompt"] = (
            "Responda diretamente e use o menor metodo suficiente. Use o CS Navigator "
            "para escolher entre resposta nativa, UX, integridade de texto ou outro "
            "especialista realmente disponivel. Nao ative Skills por palavras-chave, "
            "nao invente resultados nem trate conhecimento revisado como habilidade "
            "executada. Mostre o diagnostico so quando solicitado ou necessario."
        )
        f[name] = serialize(manifest)

    curator = f[CURATOR].decode("utf-8")
    mark = chr(96)
    curator = replace_one(curator, "version " + mark + "0.20.0-beta.6" + mark + ";",
                          "version " + mark + VERSION + mark + ";")
    bad = ("read the corresponding " + mark + "the exact specialist URI returned by the "
           "host skill inventory" + mark + " *if the host exposes reading tools*.")
    good = ("read the specialist instructions at the exact skill URI exposed by the host, "
            "only if a reading tool is available.")
    curator = replace_one(curator, bad, good)
    curator += "\n\n" + load_overlay("CURATOR_ADDENDUM.md").decode("utf-8").strip() + "\n"
    f[CURATOR] = curator.encode("utf-8")
    f[DECISIONS] = load_overlay("CURATION_DECISIONS.md")
    f[LEDGER] = load_overlay("CURATION_KNOWLEDGE.json")

    ledger = json.loads(f[LEDGER])
    if (ledger.get("schema_version") != "cs.curatorial-knowledge.v1"
            or ledger.get("version") != VERSION or len(ledger.get("rules", [])) != 9):
        raise ValueError("Unrecognized curatorial knowledge ledger")
    if any(rule.get("status") != "source_reviewed_not_host_behavior_validated"
           for rule in ledger["rules"]):
        raise ValueError("Do not promote untested behavioral claims")
    if f[".app.json"] != app_before or f[NOTICE] != notice_before:
        raise ValueError("Unexpected Registry or notice mutation")

    prior = f["README.md"].decode("utf-8")
    if PREVIOUS not in prior:
        raise ValueError("Unexpected beta.7 README")
    f["README.md"] = (
        prior.replace(PREVIOUS, VERSION).rstrip() + "\n\n" +
        load_overlay("README.md").decode("utf-8").strip() + "\n"
    ).encode("utf-8")

    qualification = json.loads(f["QUALIFICATION-MANIFEST.json"])
    if qualification["version"] != PREVIOUS or qualification["skill_count"] != 6:
        raise ValueError("Unexpected baseline qualification")
    qualification.update({
        "version": VERSION,
        "source_intent": "Evidence-bounded curation knowledge and minimal specialist selection",
        "qualification_note": "Knowledge rules and source integrity tested, host routing and semantic gain not yet qualified",
        "curation_knowledge_schema": ledger["schema_version"],
        "curation_knowledge_rules": len(ledger["rules"]),
        "curation_knowledge_state": "source_reviewed_not_host_behavior_validated",
        "curation_host_cases_executed": 0,
        "candidate_host_accepted": False,
        "umnoo_integration": "disabled_not_integrated",
    })
    qualification["files"] = {
        p: hashlib.sha256(content).hexdigest()
        for p, content in sorted(f.items()) if p.startswith("skills/")
    }
    f["QUALIFICATION-MANIFEST.json"] = serialize(qualification)

    if any(f[k] != v for k, v in baseline_specialists.items()):
        raise ValueError("Existing specialist sources have changed")
    if len(f) != 19 or sum(p.endswith("/SKILL.md") for p in f) != 6:
        raise ValueError("Unreviewed beta.8 inventory")
    if "mcp.json" in f or ".mcp.json" in f:
        raise ValueError("Portable MCP must not be bundled in Web variant")
    return f

def build(destination):
    destination = Path(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    contents = entries()
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for name, data in sorted(contents.items()):
            info = zipfile.ZipInfo("cs-navigator-web-labs/" + name, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = (stat.S_IFREG | 0o644) << 16
            z.writestr(info, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    sha = hashlib.sha256(destination.read_bytes()).hexdigest()
    destination.with_name(destination.name + ".sha256").write_text(
        sha + "  " + destination.name + "\n", encoding="utf-8")
    return {"version": VERSION, "sha256": sha, "files": len(contents),
            "zip": str(destination), "host_routing_qualified": False}

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()
    print(json.dumps(build(args.output), ensure_ascii=False, sort_keys=True))
