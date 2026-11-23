#!/usr/bin/env python3
"""Build Web Labs beta.7 with attributed UX & UI-copy evidence gates.

No network access, third-party code, automatic installation or new Skill.
"""
import argparse
import hashlib
import importlib.util
import json
import stat
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_BUILDER = ROOT / "scripts/build-cs-web-labs-beta6.py"
OVERLAY = ROOT / "plugins/cs-navigator-web-labs-beta7"
VERSION = "0.20.0-beta.7"
PREVIOUS = "0.20.0-beta.6"
DEFAULT_OUT = ROOT / "dist" / f"cs-navigator-web-labs-{VERSION}.zip"
spec = importlib.util.spec_from_file_location("cs_web_beta6", BASE_BUILDER)
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

UX_SKILL = "skills/ux-quality-gate-labs/SKILL.md"
TEXT_SKILL = "skills/text-integrity-labs/SKILL.md"
UX_REF = "skills/ux-quality-gate-labs/references/UX_REFINEMENT_PROTOCOL.md"
TEXT_REF = "skills/text-integrity-labs/references/UI_COPY_INTEGRITY.md"
NOTICE = "NOTICE-UX-SOURCES.md"


def text_file(name):
    path = OVERLAY / name
    assert path.is_file() and not path.is_symlink()
    assert path.resolve().is_relative_to(OVERLAY.resolve())
    return path.read_bytes()


def entries():
    files = base.entries()
    assert len(files) == 14
    assert sum(name.endswith("/SKILL.md") for name in files) == 6
    plugin_name = json.loads(files["plugin.json"])["name"]
    app_before = files[".app.json"]
    specialists_before = {
        k: v for k, v in files.items()
        if k.endswith("/SKILL.md")
        and k not in (UX_SKILL, TEXT_SKILL)
    }

    for path in ("plugin.json", ".codex-plugin/plugin.json"):
        obj = json.loads(files[path])
        assert obj["version"] == PREVIOUS
        obj["version"] = VERSION
        view = (obj["extensions"]["com.openai"]["interface"]
                if path == "plugin.json" else obj["interface"])
        view["shortDescription"] = "Curadoria, UX verificavel e texto fiel"
        view["defaultPrompt"] = (
            "Responda naturalmente. Use as Skills somente quando realmente ajudarem: "
            "UX deve comparar evidencias, acessibilidade e identidade existente; "
            "revisao de texto deve preservar significado e fatos. "
            "Nao redesenhe telas boas, nao fabrique dados e nao mostre diagnosticos "
            "de roteamento em pedidos simples."
        )
        files[path] = base.base.as_json(obj)

    for target, addition in ((UX_SKILL, "UX_ADDENDUM.md"),
                             (TEXT_SKILL, "TEXT_ADDENDUM.md")):
        original = files[target].decode("utf-8")
        overlay = text_file(addition).decode("utf-8")
        assert overlay.startswith("## ")
        assert "Regression TEXT-02" in original if target == TEXT_SKILL else True
        files[target] = (original.rstrip() + "\n\n" + overlay.strip() + "\n").encode("utf-8")

    files[UX_REF] = text_file("UX_REFINEMENT_PROTOCOL.md")
    files[TEXT_REF] = text_file("UI_COPY_INTEGRITY.md")
    files[NOTICE] = text_file("NOTICE-UX-SOURCES.md")

    readme = files["README.md"].decode("utf-8")
    assert PREVIOUS in readme
    files["README.md"] = (
        readme.replace(PREVIOUS, VERSION).rstrip() +
        "\n\n## beta.7 — existing UX and text skills enriched\n"
        "No new Skills are installed. The UX Quality Gate and Text Integrity Labs "
        "have precise, optional reference methods inspired by publicly attributed "
        "UI UX Pro Max (MIT) and Unslop (CC BY 4.0); see "
        "NOTICE-UX-SOURCES.md. These are original adaptations, not imported "
        "upstream databases, CLIs or scripts. Host behavior must be qualified "
        "separately from package tests.\n"
    ).encode("utf-8")

    q = json.loads(files["QUALIFICATION-MANIFEST.json"])
    assert q["version"] == PREVIOUS and q["skill_count"] == 6
    q.update({
        "version": VERSION,
        "source_intent": "Targeted UX and interface copy knowledge improvements from attributed upstream review",
        "qualification_note": "Source/ZIP tests only; no claims of upstream runtime, host semantics or UX conformance",
        "candidate_host_accepted": False,
        "natural_host_cases_executed": 0,
        "upstream_review_host_cases_executed": 0,
        "umnoo_integration": "disabled_not_integrated",
        "third_party_source_notice": NOTICE,
        "third_party_code_imported": False,
    })
    q["files"] = {
        name: hashlib.sha256(data).hexdigest()
        for name, data in sorted(files.items())
        if name.startswith("skills/")
    }
    files["QUALIFICATION-MANIFEST.json"] = base.base.as_json(q)

    assert files[".app.json"] == app_before
    assert json.loads(files["plugin.json"])["name"] == plugin_name
    assert all(files[k] == v for k, v in specialists_before.items())
    assert len(files) == 17
    assert sum(k.endswith("/SKILL.md") for k in files) == 6
    assert not any(k == "mcp.json" or k == ".mcp.json" for k in files)
    return files


def build(output):
    output = Path(output)
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path, data in sorted(entries().items()):
            info = zipfile.ZipInfo(
                "cs-navigator-web-labs/" + path,
                date_time=(2026, 1, 1, 0, 0, 0),
            )
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = (stat.S_IFREG | 0o644) << 16
            archive.writestr(info, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    sha = hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_name(output.name + ".sha256").write_text(
        f"{sha}  {output.name}\n", encoding="utf-8"
    )
    return {"version": VERSION, "sha256": sha, "files": len(entries()),
            "file": str(output), "host_qualified": False}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUT)
    print(json.dumps(build(parser.parse_args().output), ensure_ascii=False, sort_keys=True))
