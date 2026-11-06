#!/usr/bin/env python3
"""Build a reproducible, public-files-only SophIA ZIP. Never deploy or include .htaccess."""
import argparse
import hashlib
import json
import re
import zipfile
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "apps/sophia-web"


def public_files():
    names = ["index.html", "privacidade.html", "manifest.webmanifest", "sw.js", "LICENSE.txt"]
    for directory, suffixes in (("assets", {".js", ".json"}), ("icons", {".png"}),
                                 ("identidade", {".png"})):
        names += [p.relative_to(APP).as_posix() for p in (APP / directory).rglob("*")
                  if p.is_file() and p.suffix in suffixes]
    paths = sorted(names)
    for name in paths:
        path = APP / name
        if not path.is_file() or path.is_symlink():
            raise ValueError(f"Missing or nonregular public file: {name}")
    return {name: (APP / name).read_bytes() for name in paths}


def build(output=None, write=False):
    files = public_files()
    checksum = "".join(f"{hashlib.sha256(data).hexdigest()}  {name}\n" for name, data in files.items())
    target = APP / "CHECKSUMS.sha256"
    if write:
        target.write_text(checksum, encoding="utf-8")
    if target.read_text(encoding="utf-8") != checksum:
        raise ValueError("Public checksums drift; review files and run --write")
    catalog = json.loads(files["assets/skill-index.json"])
    version = catalog["app_version"]
    if not re.fullmatch(r"\d+\.\d+\.\d+", version):
        raise ValueError("Invalid release version")
    files["CHECKSUMS.sha256"] = checksum.encode()
    result = {"version": version, "public_files": len(files), "checksums": "verified",
              "deploy_executed": False, "server_configuration_included": False}
    if output:
        output = output.resolve()
        output.parent.mkdir(parents=True, exist_ok=True)
        date = datetime.strptime(catalog["generated_at"], "%Y-%m-%d")
        timestamp = (date.year, date.month, date.day, 0, 0, 0)
        with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
            for name, data in sorted(files.items()):
                info = zipfile.ZipInfo(name, timestamp)
                info.create_system = 3
                info.external_attr = 0o100644 << 16
                info.compress_type = zipfile.ZIP_DEFLATED
                archive.writestr(info, data)
        with zipfile.ZipFile(output) as archive:
            if archive.testzip() is not None or set(archive.namelist()) != set(files):
                raise ValueError("Archive integrity/file-set mismatch")
            for name, data in files.items():
                if archive.read(name) != data:
                    raise ValueError(f"Archive byte mismatch: {name}")
        result.update(file=str(output), size_bytes=output.stat().st_size,
                      sha256=hashlib.sha256(output.read_bytes()).hexdigest())
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--write", action="store_true", help="Regenerate reviewed public checksums")
    parser.add_argument("--check", action="store_true", help="Check without creating an archive")
    args = parser.parse_args()
    print(json.dumps(build(args.output, args.write), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
