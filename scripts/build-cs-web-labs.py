#!/usr/bin/env python3
"""Deterministic archive of a registered-app-only web plugin. No installation."""
import hashlib
import json
import stat
import zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DIR=ROOT/"plugins"/"cs-navigator-web-labs"
OUT=ROOT/"dist"/"cs-navigator-web-labs-0.20.0-beta.4.zip"
manifest=json.loads((DIR/"plugin.json").read_text())
assert manifest["name"]=="cs-navigator-web-labs"
assert manifest["version"]=="0.20.0-beta.4"
assert not (DIR/"mcp.json").exists() and not (DIR/".mcp.json").exists()
files=sorted(p for p in DIR.rglob("*") if p.is_file())
assert len(files)==13,files
for p in files:
    assert not p.is_symlink() and p.resolve().is_relative_to(DIR.resolve())
OUT.parent.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(OUT,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
    for p in files:
        info=zipfile.ZipInfo("cs-navigator-web-labs/"+p.relative_to(DIR).as_posix(),date_time=(2026,1,1,0,0,0))
        info.compress_type=zipfile.ZIP_DEFLATED
        info.external_attr=stat.S_IFREG<<16 | (0o644<<16)
        z.writestr(info,p.read_bytes(),compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
sha=hashlib.sha256(OUT.read_bytes()).hexdigest()
OUT.with_name(OUT.name+".sha256").write_text(sha+"  "+OUT.name+"\n")
print("Built",OUT,sha,len(files))
