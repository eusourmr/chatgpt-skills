#!/usr/bin/env python3
"""Source-only portfolio audit. Does NOT qualify ChatGPT installation or skill execution."""
from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def audit(root: Path) -> dict:
    editorial = json.loads((root / "catalog/skills.json").read_text(encoding="utf-8"))
    quality = json.loads((root / "catalog.json").read_text(encoding="utf-8"))
    entries = editorial["entries"]
    tracked = quality["entries"]
    core = [e for e in entries if e.get("category") == "regenerative-core"]
    statuses = Counter(e.get("status", "unknown") for e in tracked)
    checks = []
    issues = []
    for e in core:
        identifier = e["id"]
        url = e["url"]
        if "/tree/main/" not in url:
            issues.append(f"{identifier}: source URL is not a main-branch path")
            continue
        rel = url.split("/tree/main/", 1)[1] + "/SKILL.md"
        path = root / rel
        if not path.is_file():
            issues.append(f"{identifier}: missing {rel}")
            continue
        src = path.read_text(encoding="utf-8")
        if not src.startswith("---\n") or "\n---\n" not in src[4:]:
            issues.append(f"{identifier}: missing frontmatter")
        name_match = re.search(r"^name:\s*([\w-]+)\s*$", src, re.M)
        if not name_match or name_match.group(1) != identifier:
            issues.append(f"{identifier}: skill name/frontmatter mismatch")
        scan = {
            "id": identifier, "path": rel,
            "lines": src.count("\n") + 1,
            "activation_terms_found": bool(re.search(r"activat|invoca|ativ[aç]", src, re.I)),
            "evidence_terms_found": bool(re.search(r"evidence|evid[eê]ncia|test(ed)?|prova", src, re.I)),
            "test_terms_found": bool(re.search(r"fixture|regression|regress[aã]o|test(e|s)?\b", src, re.I)),
            "output_terms_found": bool(re.search(r"output|sa[ií]da|resultado|entrega", src, re.I)),
        }
        checks.append(scan)
    editorial_ids = {e["id"] for e in entries}
    quality_ids = {e["id"] for e in tracked}
    excluded = sorted(editorial_ids - quality_ids)
    unexpected = sorted(quality_ids - editorial_ids)
    if unexpected:
        issues.append(f"Quality IDs absent in editorial catalog: {unexpected}")
    # Differences may exist for collection-level entries; state instead of hiding them.
    eligible_external_collections = {e["id"] for e in entries if e["kind"] == "collection"}
    if set(excluded) != eligible_external_collections:
        issues.append(f"Catalog difference is not exclusively the collection: {excluded}")
    return {
        "scope": "repository_metadata_and_static_skill_sources",
        "host_activation_proven": False,
        "skill_execution_proven": False,
        "editorial_entries": len(entries),
        "quality_items": len(tracked),
        "core_skills": len(core),
        "scanned_core_skills": len(checks),
        "quality_status_counts": dict(statuses),
        "collection_exclusions": excluded,
        "heuristic_gaps": {
            "no_activation_terms": [c["id"] for c in checks if not c["activation_terms_found"]],
            "no_evidence_terms": [c["id"] for c in checks if not c["evidence_terms_found"]],
            "no_test_terms": [c["id"] for c in checks if not c["test_terms_found"]],
            "no_output_terms": [c["id"] for c in checks if not c["output_terms_found"]],
        },
        "notes": [
            "Keyword heuristics are prompts for manual review, not semantic verdicts.",
            "Catalog status verified is a repository-curation classification, not real ChatGPT execution proof.",
            "No source-only check certifies a skill as safe, installed, loaded, invoked or outcome-verified.",
        ],
        "structural_issues": issues,
    }


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--output", type=Path)
    args = ap.parse_args()
    report = audit(ROOT)
    content = json.dumps(report, indent=2, ensure_ascii=False) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(content, encoding="utf-8")
    print(content)
    if report["structural_issues"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
