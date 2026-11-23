#!/usr/bin/env python3
"""Build Web Labs from ONE canonical, inspectable source tree.

The earlier beta.5..beta.8 builders are retained as immutable regression
references, not invoked for new releases. No network, account or host mutation.
"""
import argparse
import hashlib
import json
import stat
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "plugins" / "cs-navigator-web-labs-current"
APP_ID = "asdk_app_6aee1bad0884819196a97a44393e1a53"

def source_files():
    if not SOURCE.is_dir():
        raise ValueError("Missing canonical plugin source directory")
    entries = {}
    for p in sorted(SOURCE.rglob("*")):
        if p.is_symlink():
            raise ValueError(f"Symlinks forbidden: {p}")
        if not p.is_file():
            continue
        if not p.resolve().is_relative_to(SOURCE.resolve()):
            raise ValueError("Source escaped canonical root")
        relative = p.relative_to(SOURCE).as_posix()
        if relative.startswith(".git/") or relative.endswith((".pyc", ".swp", "~")):
            raise ValueError(f"Unexpected build artifact: {relative}")
        entries[relative] = p.read_bytes()
    validate(entries)
    return entries

def validate(entries):
    try:
        plugin = json.loads(entries["plugin.json"])
        codex = json.loads(entries[".codex-plugin/plugin.json"])
        app = json.loads(entries[".app.json"])
        quality = json.loads(entries["QUALIFICATION-MANIFEST.json"])
    except (KeyError, json.JSONDecodeError) as err:
        raise ValueError(f"Invalid required plugin metadata: {err}") from err
    version = plugin.get("version")
    if not isinstance(version, str) or not version.startswith("0.20.0-beta."):
        raise ValueError("Unexpected version; do not rebrand without release review")
    if codex.get("version") != version or quality.get("version") != version:
        raise ValueError("Metadata version divergence")
    if plugin.get("name") != codex.get("name") != quality.get("plugin_name"):
        raise ValueError("Plugin identity divergence")
    if plugin["name"] != "cs-navigator-web-labs":
        raise ValueError("Unexpected plugin identity")
    if (plugin["extensions"]["com.openai"]["apps"] != "./.app.json"
        or codex["apps"] != "./.app.json"
        or len(app["apps"]) != 1 or next(iter(app["apps"].values()))["id"] != APP_ID):
        raise ValueError("Registered app identity changed")
    if "mcpServers" in codex or "mcp.json" in entries or ".mcp.json" in entries:
        raise ValueError("Do not embed duplicate portable MCP in Web variant")
    skills = [p for p in entries if p.endswith("/SKILL.md")]
    if len(skills) != 6 or quality.get("skill_count") != 6:
        raise ValueError("Six Skills required")
    if quality.get("candidate_host_accepted") is not False:
        raise ValueError("Cannot promote host qualification without real receipts")
    if quality.get("umnoo_integration") != "disabled_not_integrated":
        raise ValueError("UMNOO integration prohibited by release boundary")
    file_hashes = {p: hashlib.sha256(v).hexdigest()
                   for p, v in sorted(entries.items()) if p.startswith("skills/")}
    if quality.get("files") != file_hashes:
        raise ValueError("Manifest skill digest mismatch")
    return version

def build(output=None):
    entries = source_files()
    version = validate(entries)
    output = Path(output) if output else ROOT / "dist" / f"cs-navigator-web-labs-{version}.zip"
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path, data in sorted(entries.items()):
            info = zipfile.ZipInfo("cs-navigator-web-labs/" + path,
                                   date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = (stat.S_IFREG | 0o644) << 16
            archive.writestr(info, data, compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    sha = hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_name(output.name + ".sha256").write_text(
        f"{sha}  {output.name}\n", encoding="utf-8")
    return {"version": version, "files": len(entries), "sha256": sha,
            "zip": str(output), "host_qualified": False,
            "source": "plugins/cs-navigator-web-labs-current"}

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    print(json.dumps(build(args.output), ensure_ascii=False, sort_keys=True))
