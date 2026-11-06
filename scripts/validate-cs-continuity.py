#!/usr/bin/env python3
"""Validate the 2026-11-06 CS Navigator handoff against source and bounded evidence.
This checks documentation coherence. It does not simulate ChatGPT host tool use.
"""
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
def obj(name): return json.loads((ROOT / name).read_text(encoding="utf-8"))
def body(name): return (ROOT / name).read_text(encoding="utf-8")

record = obj("trust/qualification/pilots/host-03r-web-skill-mcp-success-2026-11-06.json")
assert record["test_id"] == "HOST-03R"
assert record["assessment"] == "pass_combined_host_skill_and_mcp_activation"
assert len(record["criteria"]) == 6 and all(x["status"] == "pass" for x in record["criteria"])
review = record["reviewer_independent_host_test"]
assert review["skills_list_invoked"] and review["skill_read_invoked"] and review["read_succeeded"]
assert review["total_exposed_skills"] == 41
assert review["lab_skills_exposed"] == 6
assert review["version_in_read_skill"] == "0.20.0-beta.4"
assert review["mcp_tool_invoked"] and review["returned"]["capability_count"] == 61
assert review["returned"]["source_commit"] == "development"
assert record["no_catalog_promotion"] and record["no_production_change"] and record["no_plugin_mutation"]

web = ROOT / "plugins/cs-navigator-web-labs"
w = obj("plugins/cs-navigator-web-labs/plugin.json")
assert w["version"] == "0.20.0-beta.4" and w["name"] == "cs-navigator-web-labs"
assert w["extensions"]["com.openai"]["apps"] == "./.app.json"
assert not (web / "mcp.json").exists() and not (web / ".mcp.json").exists()
assert len(list((web / "skills").glob("*/SKILL.md"))) == 6
source = body("plugins/cs-navigator-web-labs/skills/cs-navigator-labs/SKILL.md")
assert "0.20.0-beta.4" in source
assert obj("plugins/cs-navigator-labs/plugin.json")["version"] == "0.20.0-beta.3"
assert obj("plugins/cs-navigator/plugin.json")["version"] == "0.17.0"

registry = obj("registry/public-capabilities-v1.json")
assert len(registry["entries"]) == 63
assert sum(x.get("distribution_state") != "excluded" for x in registry["entries"]) == 61
assert registry["source_commit"] == "development"
assert registry["published_at"] == "2026-10-11"
for identifier in ("medical-appointment-prep", "caregiver-coordinator"):
    entry = next(x for x in registry["entries"] if x["id"] == identifier)
    assert entry["distribution_state"] == "excluded"
assert "Skills em rascunho | **48**" in body("PROGRESS.md")
assert "Do not edit the metrics manually" in body("PROGRESS.md")

canonical = "docs/CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md"
c = body(canonical)
assert len(c) > 9000
for required in ("HOST-03R", "0.20.0-beta.4", "0.20.0-beta.3",
                 "0.17.0", "41", "61", "48", "ROUTE-01", "ROUTE-02",
                 "development", "PROGRESS.md"):
    assert required in c, f"Handoff omission: {required}"

for path in (
    "README.md", "README.pt-BR.md", "ROADMAP.md", "docs/GETTING_STARTED.md",
    "docs/GETTING_STARTED.pt-BR.md", "docs/CS_UNIVERSAL_BETA_PHASE2.md",
    "docs/CS_HOST03_WEB_PLUGIN_VARIANT.md",
    "docs/CS_FIRST_BATTERY_QUALIFICATION_2026-11-06.md",
    "docs/CS_HOST02_ACTIVATION_DIAGNOSIS_2026-11-06.md",
    "docs/CS_SKILLS_AUDIT_2026-11-06.md",
):
    s = body(path)
    assert "CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md" in s, path
    assert "0.20.0-beta.4" in s, path

assert "HOST-03R APROVADO" in body("docs/CS_HOST03_WEB_PLUGIN_VARIANT.md")
assert "Roteiro de aceite originalmente proposto" in body("docs/CS_UNIVERSAL_BETA_PHASE2.md")
assert "Incidente histórico" in body("docs/CS_HOST02_ACTIVATION_DIAGNOSIS_2026-11-06.md")
print("CS Navigator continuity audit passed: technical private Web Beta host gate documented; public/autonomous qualification not inferred.")
