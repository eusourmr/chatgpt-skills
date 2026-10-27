#!/usr/bin/env python3
"""Deterministic, non-production RC3 skill evaluation ZIP, with hash and provenance."""
import hashlib, json, os, pathlib, zipfile
root=pathlib.Path(__file__).resolve().parents[1]
out=root/"dist"/"cs-navigator-018-rc3"
out.mkdir(parents=True,exist_ok=True)
source={
 "SKILL.md":"release/candidates/cs-navigator-v0.18.0-rc2/SKILL.md",
 "CONVERSA-RAPIDA.txt":"release/candidates/cs-navigator-v0.18.0-rc2/CONVERSA-RAPIDA.txt",
 "COMECAR-AQUI.md":"release/candidates/cs-navigator-v0.18.0-rc2/COMECAR-AQUI.md",
 "HOMOLOGACAO.md":"release/candidates/cs-navigator-v0.18.0-rc3/HOMOLOGACAO.md",
 "ci-evidence.json":"release/candidates/cs-navigator-v0.18.0-rc3/ci-evidence.json"
}
files={name:(root/path).read_bytes() for name,path in source.items()}
manifest={"product":"CS Navigator","candidate":"0.18.0-rc3-skill-evaluation","purpose":"private qualification only; not production plugin or host execution proof","source_commit":os.environ.get("GITHUB_SHA","local-unpinned"),"files":{n:hashlib.sha256(data).hexdigest() for n,data in sorted(files.items())}}
files["MANIFEST.json"]=(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n").encode()
zip_path=out/"cs-navigator-0.18.0-rc3-skill-evaluation.zip"
with zipfile.ZipFile(zip_path,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
 for name,data in sorted(files.items()):
  info=zipfile.ZipInfo(name,date_time=(2020,1,1,0,0,0))
  info.compress_type=zipfile.ZIP_DEFLATED
  info.external_attr=0o644<<16
  z.writestr(info,data,compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
digest=hashlib.sha256(zip_path.read_bytes()).hexdigest()
(out/"SHA256SUMS.txt").write_text(f"{digest}  {zip_path.name}\n",encoding="utf-8")
print(json.dumps({"path":str(zip_path),"sha256":digest,"source_commit":manifest["source_commit"],"files":list(files)},indent=2))
with zipfile.ZipFile(zip_path) as z:
 for n,data in files.items():
  assert z.read(n)==data
assert hashlib.sha256(zip_path.read_bytes()).hexdigest()==digest
