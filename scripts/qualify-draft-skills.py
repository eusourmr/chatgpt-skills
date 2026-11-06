#!/usr/bin/env python3
"""Create auditable qualification plans for catalog drafts; do not promote on static checks."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT / "trust/qualification/draft-behavior-scenarios-v1.json"
RISK = ("authentication", "money", "medical", "legal", "privacy")

def load_json(path):
    return json.loads(path.read_text(encoding="utf-8"))

def audit(root=ROOT):
    quality=load_json(root / "catalog.json")
    registry=load_json(root / "registry/public-capabilities-v1.json")
    editorial=load_json(root / "catalog/skills.json")
    fixture=load_json(root / "trust/qualification/draft-behavior-scenarios-v1.json")
    drafts={item["id"]:item for item in quality["entries"] if item["status"]=="draft"}
    scenarios={item["skill_id"]:item for item in fixture["scenarios"]}
    catalog={item["id"]:item for item in editorial["entries"]}
    reg={item["id"]:item for item in registry["entries"]}
    issues=[]
    if len(scenarios)!=len(fixture["scenarios"]):
        issues.append("Duplicate scenario skill IDs")
    if drafts.keys()!=scenarios.keys():
        issues.append("Draft/scenario mismatch: missing=%s extra=%s" %
                      (sorted(drafts.keys()-scenarios.keys()),sorted(scenarios.keys()-drafts.keys())))
    records=[]
    for identifier,item in sorted(drafts.items()):
        source= root / item.get("path","") / "SKILL.md"
        if not source.is_file():
            issues.append(f"{identifier}: missing source SKILL.md")
            continue
        body=source.read_text(encoding="utf-8")
        match=re.search(r"^name:\s*([a-z0-9-]+)\s*$",body,re.M)
        if not body.startswith("---\n") or not match or match.group(1)!=identifier:
            issues.append(f"{identifier}: invalid frontmatter or name")
        contract={
            "file_exists":True,
            "frontmatter_name_matches":bool(match and match.group(1)==identifier),
            "source_sha256":hashlib.sha256(body.encode("utf-8")).hexdigest(),
        }
        case=scenarios.get(identifier)
        if not case:
            continue
        positive=case.get("positive",{})
        if not positive.get("prompt") or not positive.get("expected"):
            issues.append(f"{identifier}: missing specific positive or acceptance criteria")
        e=catalog.get(identifier,{})
        if not e or e.get("kind")!="skill":
            issues.append(f"{identifier}: editorial entry missing")
        distribution=reg.get(identifier,{}).get("distribution_state","not_verified")
        if distribution=="excluded" and not reg[identifier].get("distribution_reason"):
            issues.append(f"{identifier}: missing exclusion rationale")
        cases=[
            {"id":identifier+"-positive", "type":"goal", "prompt":positive.get("prompt"),
             "expected":positive.get("expected"), "result":"not_run"},
            {"id":identifier+"-negative", "type":"non_activation",
             "prompt":fixture["default_negative_case"], "expected":case.get("negative",{}).get("expected"),
             "result":"not_run"},
            {"id":identifier+"-adversarial", "type":"evidence_boundary",
             "prompt":fixture["default_adversarial_case"], "expected":case.get("adversarial",{}).get("expected"),
             "result":"not_run"}
        ]
        if any(not c["expected"] for c in cases):
            issues.append(f"{identifier}: missing negative or adversarial expectations")
        records.append({
            "skill_id":identifier, "name":item["name"],"source_path":item["path"]+"/SKILL.md",
            "catalog_state":"draft", "registry_evidence_state":reg.get(identifier,{}).get("evidence_state","unknown"),
            "distribution_state":distribution,
            "distribution_rationale":reg.get(identifier,{}).get("distribution_reason"),
            "source_contract":contract,
            "evaluation_cases":cases,
            "gates":{"source_integrity":"checked",
                     "static_behavior_contract":"planned_not_executed",
                     "host_loaded":"not_verified",
                     "native_behavior":"not_run",
                     "outcome_verified":"not_run",
                     "human_release_decision":"pending"},
            "can_promote":False,
            "note":"The repository source exists; this does not prove loading, invocation or outcome."
        })
    dist=Counter(x["distribution_state"] for x in records)
    return {
        "schema_version":1,"as_of":"2026-11-06","evaluation_kind":"portfolio_qualification_plan",
        "project_origin":"catalog.json draft entries",
        "skills_draft_total":len(drafts), "plans_created":len(records),
        "scenarios_planned":3*len(records),
        "scenarios_executed":0,
        "promotions_authorized":0,
        "distribution_states":dict(sorted(dist.items())),
        "warning":"Static source checks and prompt plans do NOT change any skill status or remove exclusions.",
        "issues":issues,
        "skills":records
    }

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output",type=Path)
    parser.add_argument("--expect-drafts",type=int,default=48)
    args=parser.parse_args()
    result=audit()
    print(json.dumps({k:v for k,v in result.items() if k!="skills"},ensure_ascii=False,indent=2))
    if args.output:
        args.output.parent.mkdir(parents=True,exist_ok=True)
        args.output.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    if result["skills_draft_total"]!=args.expect_drafts or result["issues"]:
        raise SystemExit("Qualification portfolio failed source/fixture consistency checks")

if __name__=="__main__":
    main()
