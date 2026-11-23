#!/usr/bin/env python3
"""Curation host-gate validator. NEVER infers actual ChatGPT execution from fixtures.

A positive structural verdict still requires independent host attestation and a
blind review. Sample prompts, package CI or test doubles do NOT satisfy gates.
"""
import argparse
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "trust/qualification/curation/cases-beta8.json"
PROTOCOL = ROOT / "trust/qualification/curation/host-protocol-v1.json"
WEB_SOURCE = ROOT / "plugins/cs-navigator-web-labs-current"
REQUIRED_MODEL = {"id", "build", "reasoning_effort", "sampling"}
RUBRIC_KEYS = {"intent", "correctness", "usefulness", "safety"}
CONTROL_BANNED = ("cs-navigator", "cs_registry", "cs-registry",
                  "engineering-investigator-labs", "ux-quality-gate-labs",
                  "text-integrity-labs", "document-compliance-labs",
                  "academic-writing-labs", "cs-navigator-labs")

class GateError(ValueError):
    pass

def require(ok, message):
    if not ok:
        raise GateError(message)

def load(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))

def digest(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()

def read_baseline():
    cases=load(CASES)
    protocol=load(PROTOCOL)
    ids={c["id"] for c in cases["cases"]}
    require(len(ids)==12 and len(cases["cases"])==12,"Unexpected frozen CUR08 case inventory")
    require(cases["status"]=="not_run_in_chatgpt_host","Synthetic cases were incorrectly promoted")
    require(protocol["case_ids"]==[c["id"] for c in cases["cases"]],"Protocol case ordering changed")
    require(protocol["state"]=="awaiting_independent_host_evidence","Cannot rewrite protocol state as pass")
    require(protocol["min_independent_reviewers"]==2 and
            protocol["blind_arm_labels"] is True,"Blinding guard removed")
    require(protocol["source_version"]=="0.20.0-beta.8","Wrong source version")
    require(len(protocol["rubric"])==4 and
            set(protocol["rubric"])==RUBRIC_KEYS,"Rubric changed")
    require(not protocol["host_run_evidence_supplied"],"Fake host evidence state")
    return cases,protocol

def validate_run(run, lookup, *, arm):
    require(isinstance(run, dict),"Run must be an object")
    case=lookup.get(run.get("case_id"))
    require(case is not None,"Unknown CUR08 case")
    require(run.get("arm")==arm,"Wrong arm")
    require(run.get("capture_kind")=="host_export","Host-export receipt required")
    require(run.get("context_reset") is True,"Fresh context not evidenced")
    require(run.get("inventory_complete") is True and
            run.get("trace_complete") is True,"Incomplete host inventory/trace")
    require(run.get("environment_id") and run.get("session_id"),
            "Missing session/environment IDs")
    require(run.get("prompt_sha256")==digest(case["prompt"]),"Prompt changed from frozen case")
    require(isinstance(run.get("response_text"),str) and run["response_text"].strip(),
            "Missing host response")
    require(set(run.get("model",{}))>=REQUIRED_MODEL,"Model configuration not fully declared")
    require(all(run["model"][k] not in (None,"","unknown","unreported")
                for k in REQUIRED_MODEL),"Unverified model configuration")
    require(isinstance(run.get("available_skills"),list) and
            isinstance(run.get("available_tools"),list),"Missing complete inventory")
    require(isinstance(run.get("events"),list) and
            all(isinstance(e,dict) for e in run["events"]),"Invalid tool event trace")
    for e in run["events"]:
        require(e.get("event") in ("skill_read","tool_call","tool_result"),
                "Unknown task event type")
    return case

def validate_dossier(dossier):
    cases,protocol=read_baseline()
    lookup={c["id"]:c for c in cases["cases"]}
    require(dossier.get("schema_version")==1,"Unknown dossier schema")
    require(dossier.get("state")=="submitted_for_review","Dossier must not self-certify")
    treatment=dossier.get("treatment",[])
    controls=dossier.get("control",[])
    require(len(treatment)==len(controls)==12,"Need all 12 independent A/B pairs")
    observed_ids=set()
    used_sessions=set()
    used_environments=set()
    differences=[]
    score_summary=[]
    for treated,control in zip(treatment,controls):
        tcase=validate_run(treated,lookup,arm="treatment")
        ccase=validate_run(control,lookup,arm="control")
        case_id=tcase["id"]
        require(ccase["id"]==case_id,"Mismatched pair")
        require(case_id not in observed_ids,"Repeated evaluation case")
        observed_ids.add(case_id)
        require(treated["model"]==control["model"],"Different model or configuration")
        require(treated.get("context_sha256")==control.get("context_sha256") and
                isinstance(treated.get("context_sha256"),str) and
                len(treated["context_sha256"])==64,"Control and treatment context differ")
        for run in (treated,control):
            session=run["session_id"]
            environment=run["environment_id"]
            require(session not in used_sessions and environment not in used_environments,
                    "Reused session/environment; no isolated control")
            used_sessions.add(session)
            used_environments.add(environment)
        hay=json.dumps({"skills":control["available_skills"],
                         "tools":control["available_tools"],
                         "events":control["events"],
                         "response":control["response_text"]},ensure_ascii=False).lower()
        require(not any(term in hay for term in CONTROL_BANNED),
                "Control contaminated by CS capabilities or their mention")
        if tcase["expected"]=="native" or tcase["expect_specialist_reads"]==0:
            require(not treated["events"],"Native-first case invoked tools")
        # Verified reads require the exact URI and source hash in a host trace.
        installed = {p.parent.name:p for p in (WEB_SOURCE/"skills").glob("*/SKILL.md")}
        for event in treated["events"]:
            if event["event"]=="skill_read":
                uri=event.get("uri","")
                require(isinstance(uri,str) and uri.startswith("skills://plugins/cs-navigator-web-labs/"),
                        "Unknown plugin skill URI")
                slug=uri.removeprefix("skills://plugins/cs-navigator-web-labs/").removesuffix("/skill.md")
                normalized_uri="skills://plugins/cs-navigator-web-labs/"+slug
                require(slug in installed and (uri in treated["available_skills"] or
                        normalized_uri in treated["available_skills"]) and
                        event.get("success") is True and
                        event.get("source_sha256")==hashlib.sha256(installed[slug].read_bytes()).hexdigest(),
                        "Specialist read source differs from installed version")
        reviewers=dossier.get("blind_review",{}).get(case_id)
        require(isinstance(reviewers,list) and len(reviewers)>=2,
                "Two independent blind reviewers required")
        by_arm={"control":[],"treatment":[]}
        for review in reviewers:
            rid=review.get("reviewer_id")
            require(isinstance(rid,str) and rid.strip(),"Reviewer identity missing")
            require(review.get("arm") in ("control","treatment"),
                    "Blind review arm missing")
            require(review.get("identity_unblinded") is False,
                    "Reviewer has seen the treatment identity")
            scores=review.get("scores",{})
            require(set(scores)==RUBRIC_KEYS,"Incomplete reviewer rubric")
            require(all(type(n) is int and 0<=n<=4 for n in scores.values()),
                    "Review scores must be integers 0..4")
            by_arm[review["arm"]].append((rid,sum(scores.values())))
        require(all(len({rid for rid,_ in by_arm[arm]})>=2 for arm in by_arm),
                "At least two DISTINCT independent reviewers per arm required")
        control_scores=[score for _,score in by_arm["control"]]
        treatment_scores=[score for _,score in by_arm["treatment"]]
        delta=sum(treatment_scores)/len(treatment_scores)-sum(control_scores)/len(control_scores)
        differences.append(delta)
        score_summary.append({"case_id":case_id,"score_delta_16_point_scale":delta})
    require(observed_ids==set(lookup),"Not all cases evaluated")
    # This measures consistency, not causation, host authenticity or semantic correctness.
    return {
        "state":"structurally_consistent_pending_independent_host_attestation",
        "homologation_passed":False,
        "validated_pairs":12,
        "mean_score_difference_unattested":sum(differences)/len(differences),
        "scores":score_summary,
        "note":"Human reviews and host exports remain self-reported until separately authenticated. No causal benefit may be claimed."
    }

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--check",action="store_true")
    parser.add_argument("--dossier",type=Path)
    args=parser.parse_args()
    if args.dossier:
        result=validate_dossier(load(args.dossier))
    else:
        cases,protocol=read_baseline()
        result={
          "state":"awaiting_independent_host_evidence",
          "homologation_passed":False,
          "frozen_cases":len(cases["cases"]),
          "pairs_executed":0,
          "blind_reviews_completed":0,
          "evidence":"current-chat skills__read does not constitute fresh isolated treatment or control"
        }
    print(json.dumps(result,ensure_ascii=False,indent=2))

if __name__=="__main__":
    try:
        main()
    except (GateError,ValueError,KeyError,OSError,TypeError) as e:
        raise SystemExit("EVIDENCE REJECTED: "+str(e))
