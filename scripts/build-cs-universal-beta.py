#!/usr/bin/env python3
"""Build the private CS Navigator Universal Beta ZIP, without publishing it."""
import argparse
import hashlib
import json
import stat
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "plugins" / "cs-navigator-labs"

def build(output: Path):
    manifest = json.loads((PACKAGE / "plugin.json").read_text(encoding="utf-8"))
    overlay = json.loads((PACKAGE / ".codex-plugin/plugin.json").read_text(encoding="utf-8"))
    qualification = json.loads((PACKAGE / "QUALIFICATION-MANIFEST.json").read_text(encoding="utf-8"))
    assert manifest["name"] == overlay["name"] == "cs-navigator-labs"
    assert manifest["version"] == overlay["version"] == qualification["version"] == "0.20.0-beta.3"
    assert manifest["extensions"]["com.openai"]["interface"]["defaultPrompt"] == overlay["interface"]["defaultPrompt"]
    mcp = json.loads((PACKAGE / "mcp.json").read_text(encoding="utf-8"))
    assert list(mcp["mcpServers"]) == ["cs-navigator-registry"]
    server = mcp["mcpServers"]["cs-navigator-registry"]
    assert server["url"] == "https://chatgpt-skills.onrender.com/mcp"
    assert server["type"] == "streamable-http"
    assert server["extensions"]["com.openai"]["auth"]["type"] == "none"

    app = json.loads((PACKAGE / ".app.json").read_text(encoding="utf-8"))
    app_id = "asdk_app_6aee1bad0884819196a97a44393e1a53"
    assert manifest["extensions"]["com.openai"]["apps"] == "./.app.json"
    assert overlay["apps"] == "./.app.json"
    assert list(app["apps"].values()) == [{"id": app_id}]
    assert qualification["app_binding_present"] is True
    assert qualification["app_binding_id"] == app_id
    assert qualification["combined_plugin_host_invocation_tested"] is False

    entries = sorted(p for p in PACKAGE.rglob("*") if p.is_file())
    assert len(entries) == 14, f"Unexpected packaged file inventory: {len(entries)}"
    for f in entries:
        assert not f.is_symlink(), f"Unexpected symlink: {f}"
        assert f.resolve().is_relative_to(PACKAGE.resolve()), f"Path escapes package: {f}"
        if f.relative_to(PACKAGE).as_posix().startswith("skills/"):
            expected = qualification["files"][f.relative_to(PACKAGE).as_posix()]
            assert hashlib.sha256(f.read_bytes()).hexdigest() == expected, str(f)
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for f in entries:
            filename = (Path("cs-navigator-labs") / f.relative_to(PACKAGE)).as_posix()
            info = zipfile.ZipInfo(filename, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = stat.S_IFREG << 16 | 0o644 << 16
            archive.writestr(info, f.read_bytes(), compress_type=zipfile.ZIP_DEFLATED, compresslevel=9)
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_name(output.name + ".sha256").write_text(f"{digest}  {output.name}\n", encoding="utf-8")
    print(f"{output}\nSHA-256 {digest}\nFiles {len(entries)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=ROOT / "dist" / "cs-navigator-labs-0.20.0-beta.3.zip")
    build(parser.parse_args().output)
