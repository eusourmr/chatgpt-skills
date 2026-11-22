#!/usr/bin/env python3
"""Produce a reproducible private 0.20.0-beta.5 Web Labs ZIP; never install it."""
import argparse
import hashlib
import json
import stat
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "plugins/cs-navigator-web-labs"
OVERLAY = ROOT / "plugins/cs-navigator-web-labs-beta5"
VERSION = "0.20.0-beta.5"
PREVIOUS = "0.20.0-beta.4"
DEFAULT_OUT = ROOT / "dist" / f"cs-navigator-web-labs-{VERSION}.zip"
CURATOR = "skills/cs-navigator-labs/SKILL.md"
PLAYBOOK = "skills/cs-navigator-labs/references/ROUTING_PLAYBOOK.md"
METHOD = "skills/cs-navigator-labs/references/PROMPT_ENGINEERING.md"


def as_json(data):
    return (json.dumps(data, ensure_ascii=False, sort_keys=True, indent=2) + "\n").encode("utf-8")


def archive_entries():
    assert BASE.is_dir() and OVERLAY.is_dir()
    assert not (BASE / "mcp.json").exists() and not (BASE / ".mcp.json").exists()
    source = sorted(p for p in BASE.rglob("*") if p.is_file())
    assert len(source) == 13, f"Unexpected baseline inventory: {len(source)}"
    entries = {}
    for file in source:
        assert not file.is_symlink() and file.resolve().is_relative_to(BASE.resolve())
        entries[file.relative_to(BASE).as_posix()] = file.read_bytes()

    manifest = json.loads(entries["plugin.json"])
    codex = json.loads(entries[".codex-plugin/plugin.json"])
    quality = json.loads(entries["QUALIFICATION-MANIFEST.json"])
    assert manifest["version"] == codex["version"] == quality["version"] == PREVIOUS
    assert manifest["name"] == codex["name"] == quality["plugin_name"] == "cs-navigator-web-labs"
    assert manifest["extensions"]["com.openai"]["apps"] == codex["apps"] == "./.app.json"
    assert "mcpServers" not in codex
    app = json.loads(entries[".app.json"])
    assert len(app["apps"]) == 1
    assert next(iter(app["apps"].values()))["id"] == "asdk_app_6aee1bad0884819196a97a44393e1a53"

    for path in ("plugin.json", ".codex-plugin/plugin.json"):
        config = json.loads(entries[path])
        config["version"] = VERSION
        interface = config["extensions"]["com.openai"]["interface"] if path == "plugin.json" else config["interface"]
        interface["shortDescription"] = "Curadoria e engenharia contextual de prompts"
        interface["longDescription"] = (
            "Laboratorio privado para ChatGPT Web: seis skills, app Registry e metodo "
            "proporcional de engenharia de prompts. Esta versao requer homologacao no host."
        )
        interface["defaultPrompt"] = (
            "Use o CS Navigator quando acrescentar valor. Para criar ou revisar prompts, "
            "preserve minha intencao e informe mudancas materiais antes de alterar texto. "
            "Nao alegue leitura de skills, testes ou ferramentas sem evidencia."
        )
        entries[path] = as_json(config)

    original = entries[CURATOR].decode("utf-8")
    assert PREVIOUS in original
    appendix = (OVERLAY / "CURATOR_ADDENDUM.md").read_text(encoding="utf-8")
    assert "Engenharia contextual de prompts" in appendix
    entries[CURATOR] = (
        original.replace(PREVIOUS, VERSION).rstrip() + "\n\n" + appendix.strip() + "\n"
    ).encode("utf-8")
    playbook = entries[PLAYBOOK].decode("utf-8")
    entries[PLAYBOOK] = (
        playbook.rstrip() + "\n\n## Engenharia de prompts contextual\n\n"
        "Somente quando solicitada ou materialmente util, aplicar o metodo "
        "de PROMPT_ENGINEERING.md; preservar intencao, nao inventar "
        "ativacao de Skill, executar tarefas diretamente quando possivel.\n"
    ).encode("utf-8")
    entries[METHOD] = (OVERLAY / "PROMPT_ENGINEERING.md").read_bytes()
    entries["README.md"] = (OVERLAY / "README.md").read_bytes()

    quality.update({
        "version": VERSION,
        "source_intent": "Private Web Labs prompt engineering trial; baseline beta.4 remains available",
        "qualification_note": "Only source/package checks; prompt engineering host outcomes unverified",
        "native_host_invocation_tested": False,
        "combined_plugin_host_invocation_tested": False,
        "candidate_host_accepted": False,
        "pc02_host_cases_executed": 0,
        "umnoo_integration": "disabled_not_integrated",
        "skill_count": 6,
    })
    quality["files"] = {
        name: hashlib.sha256(data).hexdigest()
        for name, data in sorted(entries.items()) if name.startswith("skills/")
    }
    entries["QUALIFICATION-MANIFEST.json"] = as_json(quality)
    assert len(entries) == 14, len(entries)
    assert not any(path.endswith("/mcp.json") or path in ("mcp.json", ".mcp.json") for path in entries)
    assert sum(p.endswith("/SKILL.md") for p in entries) == 6
    return entries


def build(output):
    entries = archive_entries()
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for path, data in sorted(entries.items()):
            info = zipfile.ZipInfo("cs-navigator-web-labs/" + path, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = (stat.S_IFREG | 0o644) << 16
            z.writestr(info, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_name(output.name + ".sha256").write_text(
        f"{digest}  {output.name}\n", encoding="utf-8"
    )
    return {"version": VERSION, "zip": str(output), "sha256": digest,
            "files": len(entries), "host_accepted": False}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()
    print(json.dumps(build(args.output), ensure_ascii=False, sort_keys=True))
