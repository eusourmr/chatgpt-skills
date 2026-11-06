#!/usr/bin/env python3
"""Check Phase 3 evidence consistency, never execute receipts or promote skills.

Host exports need independent review. A hash binds bytes, not truth or origin.
Unit fixtures, source reviews and development rehearsals cannot pass a host gate.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PHASE = "trust/qualification/phase3"
SPECIALIST = "engineering-investigator-labs"
CASES = {"positive", "non_activation", "adversarial", "permission"}
CS_NAMES = re.compile(
    r"cs[-_ ]navigator|cs[-_ ]registry|academic-writing-labs|document-compliance-labs|"
    r"engineering-investigator-labs|text-integrity-labs|ux-quality-gate-labs", re.I
)


class EvidenceError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise EvidenceError(message)


def load(path):
    return json.loads(path.read_text(encoding="utf-8"))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def artifact(root, ref, *, binary=False):
    """Read only bounded, hash-pinned local UTF-8 evidence; never run its commands."""
    require(isinstance(ref, dict), "Missing artifact reference")
    relative = Path(ref.get("path", ""))
    require(str(relative) != "." and not relative.is_absolute() and ".." not in relative.parts,
            "Artifact path must be relative and contained")
    base = root.resolve()
    target = (root / relative).resolve()
    require(target.is_relative_to(base), "Artifact escapes evidence root")
    require(target.is_file(), f"Missing artifact: {relative}")
    data = target.read_bytes()
    require(digest(data) == ref.get("sha256"), f"Artifact hash mismatch: {relative}")
    if binary:
        return data
    text = data.decode("utf-8")
    require(bool(text.strip()), f"Empty artifact: {relative}")
    return text


def obj(root, ref):
    return json.loads(artifact(root, ref))


def host_run(root, run):
    """Return normalized, mutually bound receipts, not authenticated host evidence."""
    require(run.get("kind") == "host_run", "Not a host run")
    env = obj(root, run.get("environment"))
    inventory = obj(root, run.get("inventory"))
    trace = obj(root, run.get("trace"))
    session = env.get("session_id")
    require(bool(session) and bool(env.get("environment_id")), "Missing host/session identity")
    require(env.get("context_reset") is True, "Fresh context not evidenced")
    require(inventory.get("session_id") == trace.get("session_id") == session,
            "Receipt session mismatch")
    for receipt in (env, inventory, trace):
        require(receipt.get("capture_kind") == "host_export", "Host export required")
    require(inventory.get("complete") is True and trace.get("complete") is True,
            "Incomplete inventory or task trace")
    require(trace.get("scope") == "task_only", "Task-only trace required")
    require(isinstance(trace.get("events"), list), "Missing task events")
    require(all(isinstance(e, dict) for e in trace["events"]), "Malformed task event")
    require(all(isinstance(inventory.get(k), list) for k in ("skills", "tools")),
            "Missing skill/tool inventory")
    require(all(isinstance(x, str) for k in ("skills", "tools") for x in inventory[k]),
            "Inventory IDs must be strings")
    for key in ("prompt", "context", "response"):
        artifact(root, run.get(key))
    return env, inventory, trace


def regressions(root, receipts):
    require(isinstance(receipts, list) and len(receipts) == 2,
            "Need corrected and baseline regression receipts")
    require({t.get("role") for t in receipts} == {"corrected", "baseline"},
            "Missing corrected/baseline contrast")
    for test in receipts:
        output = artifact(root, test.get("output"))
        require(bool(test.get("inputs")), "Missing regression input hashes")
        for ref in test["inputs"]:
            artifact(root, ref)
        counts = {}
        for key in ("tests", "pass", "fail"):
            found = re.search(rf"^# {key} (\d+)$", output, re.M)
            require(bool(found), "Incomplete TAP regression summary")
            counts[key] = int(found.group(1))
            require(counts[key] == test.get(key), "TAP/receipt count mismatch")
        expected = 0 if test["role"] == "corrected" else 1
        require(test.get("exit_code") == test.get("expected_exit_code") == expected,
                "Unexpected regression exit status")
        require(counts["tests"] > 0, "Zero executed tests")
        if expected == 0:
            require(counts["pass"] == counts["tests"] and counts["fail"] == 0,
                    "Corrected regression did not pass")
        else:
            require(counts["fail"] > 0 and "ERR_ASSERTION" in output,
                    "Baseline must fail a regression assertion, not infrastructure")


def route_evidence(root, run, route):
    if run is None:
        return "not_run"
    env, inventory, trace = host_run(root, run)
    events = trace["events"]
    if route == "ROUTE-01":
        require(not events, "ROUTE-01 must have zero task tool calls")
        answer = artifact(root, run["response"]).strip().rstrip(".! ")
        require(answer.casefold() == "brasília", "Unexpected trivial-task answer")
    else:
        require(SPECIALIST in inventory["skills"], "Specialist absent from host inventory")
        source = artifact(root, run.get("skill_source"))
        reads = [e for e in events if e.get("event") == "skill_read"
                 and e.get("skill_id") == SPECIALIST and e.get("success") is True
                 and e.get("source_sha256") == digest(source.encode())
                 and "plugins_6aee22530eb88191bed0e982d96d1218" in e.get("resource", "")]
        require(bool(reads), "No matching successful Web specialist read in task trace")
        regressions(root, run.get("test_receipts"))
        # Validate data consistency only; do not certify truth from self-reported output.
    return "evidence_consistent_pending_independent_review"


def compare_ab(root, ab):
    if ab.get("state") == "control_unavailable":
        require(bool(ab.get("reason")), "Control unavailability needs a reason")
        return {"state": "control_unavailable", "causal_claim_allowed": False}
    require(ab.get("state") == "submitted_pair", "Unknown A/B state")
    control, treatment = ab["control"], ab["treatment"]
    ce, ci, ct = host_run(root, control)
    te, ti, tt = host_run(root, treatment)
    require(ce["session_id"] != te["session_id"], "A/B sessions must be distinct")
    require(ce["environment_id"] != te["environment_id"], "Control environment not isolated")
    model_keys = {"id", "build", "reasoning_effort", "sampling"}
    for env in (ce, te):
        model = env.get("model", {})
        require(isinstance(model, dict), "Malformed model configuration")
        require(model_keys <= model.keys(), "Incomplete model configuration")
        require(all(model[k] not in (None, "", "unknown", "unreported") for k in model_keys),
                "Unverified model configuration")
    require(ce["model"] == te["model"], "Model configurations differ")
    for key in ("prompt", "context"):
        require(control[key]["sha256"] == treatment[key]["sha256"], f"A/B {key} differs")
    spec = load(root / PHASE / "protocol.json")
    require(control["prompt"]["sha256"] == spec["routes"]["ROUTE-02"]["prompt"]["sha256"],
            "A/B prompt differs from frozen neutral case")
    require(not any(CS_NAMES.search(x) for k in ("skills", "tools") for x in ci[k]),
            "Control contaminated by available CS capability")
    require(not any(CS_NAMES.search(json.dumps(e)) for e in ct["events"]),
            "Control trace contains CS use")
    # A claim in the answer is enough to invalidate the control, not prove execution.
    require(not CS_NAMES.search(artifact(root, control["response"])),
            "Control response claims or mentions CS; inspect contamination")
    route_evidence(root, treatment, "ROUTE-02")
    require(SPECIALIST in ti["skills"], "No treatment specialist exposure")
    return {"state": "pair_consistent_pending_blind_review", "causal_claim_allowed": False}


def check_batch(root, batch):
    quality = load(root / "catalog.json")
    drafts = {x["id"] for x in quality["entries"] if x["status"] == "draft"}
    registry = {x["id"]: x for x in load(root / "registry/public-capabilities-v1.json")["entries"]}
    require(len(drafts) == batch["portfolio_drafts"] == 48, "Draft portfolio changed; rebase batch")
    records = batch["skills"]
    require(0 < len(records) <= 3, "First batch must remain small")
    require(len({s["skill_id"] for s in records}) == len(records), "Duplicate batch skill")
    for skill in records:
        identifier = skill["skill_id"]
        require(identifier in drafts, "Batch contains a non-draft")
        require(registry[identifier]["distribution_state"] != "excluded", "Excluded skill in batch")
        artifact(root, skill["source"])
        require(skill["source"]["path"] == f"skills/{identifier}/SKILL.md", "Wrong source path")
        artifact(root, skill["companion_source"])
        require(skill["companion_source"]["path"] == f"skills/{identifier}/agents/openai.yaml",
                "Wrong companion source path")
        require(skill["source_review"]["status"] == "reviewed_source_only", "Wrong review level")
        require(skill.get("promotion_allowed") is False, "Promotion is outside this checker")
        require(len(skill["cases"]) == 4 and {c["kind"] for c in skill["cases"]} == CASES,
                "Need positive, non-activation, adversarial and permission cases")
        for case in skill["cases"]:
            require(case.get("prompt") and case.get("acceptance"), "Missing per-skill case contract")
            require(case["status"] == "not_run", "First source-review batch cannot claim behavior")
    return {"source_reviews": len(records), "behavior_cases_planned": 4 * len(records),
            "behavior_cases_executed": 0, "drafts_remaining_outside_batch": 48 - len(records),
            "promotions": 0}


def check(root=ROOT, dossier=None):
    spec = load(root / PHASE / "protocol.json")
    record = load(dossier or root / PHASE / "development-2026-11-06.json")
    require(spec["base_commit"] == record["base_commit"], "Baseline mismatch")
    require(load(root / "plugins/cs-navigator/plugin.json")["version"] == "0.17.0",
            "Production version changed")
    # Every pinned production file must match; a version string alone is insufficient.
    for ref in spec["production_files"]:
        artifact(root, ref, binary=True)
    actual = {str(p.relative_to(root)) for p in (root / "plugins/cs-navigator").rglob("*") if p.is_file()}
    require(actual == {r["path"] for r in spec["production_files"]}, "Production file set changed")
    batch = check_batch(root, load(root / PHASE / "batch-01.json"))
    for case in spec["routes"].values():
        artifact(root, case["prompt"])
    rehearsal = record["route02_development_rehearsal"]
    source = artifact(root, rehearsal["skill_source"])
    trace = obj(root, rehearsal["read_receipt"])
    require(trace["capture_kind"] == "tool_result_transcription", "Rehearsal capture mislabeled")
    require(trace["tool"] == "skills__read" and trace["success"] is True, "Missing observed read")
    require(trace["source_sha256"] == digest(source.encode()), "Read/source mismatch")
    require(rehearsal["formal_host_gate_passed"] is False, "Rehearsal is not host acceptance")
    artifact(root, rehearsal["analysis"])
    regressions(root, rehearsal["test_receipts"])
    routes = record["host_routes"]
    for route, run in routes.items():
        require(route in ("ROUTE-01", "ROUTE-02"), "Unknown route")
        if run is not None:
            require(run["prompt"]["sha256"] == spec["routes"][route]["prompt"]["sha256"],
                    "Host prompt differs from frozen case")
    require(set(routes) == {"ROUTE-01", "ROUTE-02"}, "Missing host route state")
    return {"scope": "artifact_consistency_not_host_attestation",
            "host_routes": {k: route_evidence(root, v, k) for k, v in routes.items()},
            "route02_development_rehearsal": "source_read_and_regression_receipts_checked",
            "ab": compare_ab(root, record["ab"]), "batch": batch,
            "production": "all_pinned_files_unchanged", "promotion_allowed": False}


def prepare(destination, root=ROOT):
    """Export neutral prompts and a protocol, not a model run or an isolated host."""
    spec = load(root / PHASE / "protocol.json")
    destination.mkdir(parents=True, exist_ok=False)
    for route, case in spec["routes"].items():
        prompt = artifact(root, case["prompt"])
        (destination / f"{route}.txt").write_text(prompt, encoding="utf-8")
    # Identical treatment and control inputs. Keep condition labels out of the prompt.
    prompt = artifact(root, spec["routes"]["ROUTE-02"]["prompt"])
    for arm in ("A", "B"):
        target = destination / arm
        target.mkdir()
        (target / "prompt.txt").write_text(prompt, encoding="utf-8")
    (destination / "PROTOCOL.md").write_text((root / "docs/CS_PHASE3_QUALIFICATION.md").read_text(), encoding="utf-8")
    return {"state": "packets_prepared_not_executed", "path": str(destination)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--dossier", type=Path)
    parser.add_argument("--prepare", type=Path)
    args = parser.parse_args()
    try:
        result = prepare(args.prepare) if args.prepare else check(dossier=args.dossier)
    except (EvidenceError, KeyError, TypeError, ValueError, OSError) as error:
        parser.exit(1, f"Evidence rejected: {error}\n")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
