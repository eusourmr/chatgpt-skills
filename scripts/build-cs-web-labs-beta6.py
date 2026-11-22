#!/usr/bin/env python3
"""Build CS Navigator Web beta.6 from beta.5, preserving every specialist."""
import argparse, hashlib, importlib.util, json, stat, zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("cs_beta5",ROOT/"scripts/build-cs-web-labs-beta5.py")
base=importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
VERSION="0.20.0-beta.6"
OUT=ROOT/"dist"/f"cs-navigator-web-labs-{VERSION}.zip"
CUR="skills/cs-navigator-labs/SKILL.md"
PLAY="skills/cs-navigator-labs/references/ROUTING_PLAYBOOK.md"

def swap(s,old,new):
    assert s.count(old)==1, ("Unexpected source",old[:70])
    return s.replace(old,new)

def entries():
    f=base.archive_entries()
    assert len(f)==14
    for k in ("plugin.json",".codex-plugin/plugin.json"):
        v=json.loads(f[k])
        assert v["version"]=="0.20.0-beta.5"
        v["version"]=VERSION
        ui=v["extensions"]["com.openai"]["interface"] if k=="plugin.json" else v["interface"]
        ui["shortDescription"]="Curadoria discreta e engenharia contextual"
        ui["defaultPrompt"]=(
            "Responda naturalmente. Use Skills apenas quando agregarem valor material; "
            "tarefas simples não exigem diagnóstico ou pesquisa de Registry. "
            "Para pedidos de execução, entregue o resultado, não um prompt para copiar. "
            "Só explique roteamento quando eu solicitar ou quando afetar a resposta."
        )
        f[k]=base.as_json(v)
    s=f[CUR].decode()
    s=swap(s,"version "+chr(96)+"0.20.0-beta.5"+chr(96)+";",
           "version "+chr(96)+VERSION+chr(96)+";")
    s=swap(s,"skills://plugins/cs-navigator-labs/<name>/skill.md",
           "the exact specialist URI returned by the host skill inventory")
    s=swap(s,"Answer the task, then give precise skill choice and status, evidence/uncertainty, and the smallest next action. Never fabricate semantic confidence scores or test results.",
           "Answer directly in the format requested. For ordinary tasks keep routing, skills and Registry invisible. Explain a tool, access, evidence or security limitation only when material. On an explicit audit, distinguish listed, read, invoked and verified. Never invent tests, tool calls or confidence scores.")
    s=swap(s,"On a newly opened chat with **CS Navigator Labs Web** selected, first inspect the skill inventory, then read this skill via the returned host URI if present. Compare with Registry tool visibility.",
           "Only for an explicitly requested host activation audit, check inventory, read the actual host URI and compare Registry tool visibility. Do not run diagnostics on every new conversation or on trivial tasks.")
    s+="\n## Natural-use correction beta.6\nCuratorial mechanics stay silent unless needed or requested. " \
       "The curator must answer the actual question, not substitute an unwanted prompt. " \
       "When justified, specialist instructions must be read through an actual host-listed URI; " \
       "never assume old Labs plugin namespaces. No cross-chat memory or UMNOO bridge is created.\n"
    f[CUR]=s.encode()
    p=f[PLAY].decode()
    p+="\n## Beta.6 host guidance\nA Web specialist must be read using the precise host-listed URI, " \
       "not a hardcoded portable Labs path. Native-first means no routine diagnostics for easy " \
       "tasks and no unrequested report of route or tool names.\n"
    f[PLAY]=p.encode()
    meth="skills/cs-navigator-labs/references/PROMPT_ENGINEERING.md"
    f[meth]+=b"\n## beta.6 natural-use checks\nExecution requests yield results, not prompt templates; simple questions stay native; specialist invocation requires a real host read.\n"
    f["README.md"]=f["README.md"].replace(b"0.20.0-beta.5",VERSION.encode())+(
        "\nBeta.6 fixes the specialist URI, diagnostic-first behavior, and mechanical routing reports. No seventh Skill.\n").encode()
    q=json.loads(f["QUALIFICATION-MANIFEST.json"])
    assert q["version"]=="0.20.0-beta.5"
    q.update(version=VERSION,candidate_host_accepted=False,natural_host_cases_executed=0,
             source_intent="Natural-use fix: dynamic host skill URI and no diagnostic overhead")
    q["files"]={k:hashlib.sha256(v).hexdigest() for k,v in sorted(f.items()) if k.startswith("skills/")}
    f["QUALIFICATION-MANIFEST.json"]=base.as_json(q)
    assert len(f)==14 and sum(k.endswith("/SKILL.md") for k in f)==6
    assert "mcp.json" not in f and ".mcp.json" not in f
    return f

def build(out):
    out=Path(out)
    out.parent.mkdir(parents=True,exist_ok=True)
    with zipfile.ZipFile(out,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=9) as z:
        for k,v in sorted(entries().items()):
            info=zipfile.ZipInfo("cs-navigator-web-labs/"+k,date_time=(2026,1,1,0,0,0))
            info.compress_type=zipfile.ZIP_DEFLATED
            info.external_attr=(stat.S_IFREG|0o644)<<16
            z.writestr(info,v,compress_type=zipfile.ZIP_DEFLATED,compresslevel=9)
    sha=hashlib.sha256(out.read_bytes()).hexdigest()
    out.with_name(out.name+".sha256").write_text(f"{sha}  {out.name}\n")
    return {"version":VERSION,"sha256":sha,"file":str(out)}

if __name__=="__main__":
    arg=argparse.ArgumentParser()
    arg.add_argument("--output",type=Path,default=OUT)
    print(json.dumps(build(arg.parse_args().output),ensure_ascii=False))
