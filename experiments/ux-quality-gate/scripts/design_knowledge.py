#!/usr/bin/env python3
"""Offline design principle retrieval, backed by traceable sources. NOT a neural model."""
from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

GRAPH = Path(__file__).resolve().parents[1] / "knowledge/design-cognition-v1.json"

def words(text):
    simple = unicodedata.normalize("NFKD", text.lower())
    simple = "".join(c for c in simple if not unicodedata.combining(c))
    return {t for t in re.findall(r"[a-z0-9]+", simple) if len(t) >= 4}

def load_graph(path=GRAPH):
    graph = json.loads(Path(path).read_text(encoding="utf-8"))
    assert graph["schema_version"] == 1
    assert graph["neural_network_trained"] is False
    authors = {a["id"] for a in graph["people"]}
    cards = {c["id"] for c in graph["cards"]}
    assert len(authors) == 11 and len(cards) == len(graph["cards"])
    assert all(c["author_id"] in authors for c in graph["cards"])
    assert all(c["provenance"]["source_url"].startswith("https://") for c in graph["cards"])
    assert all(r["from"] in cards and r["to"] in cards for r in graph["relations"])
    return graph

def recommend(query, graph=None, max_cards=5):
    graph = graph or load_graph()
    query_tokens = words(query)
    people = {p["id"]: p["name"] for p in graph["people"]}
    # Lexical matches only. Do not represent this as model training or human verification.
    direct = {}
    card_lookup = {c["id"]: c for c in graph["cards"]}
    for card in graph["cards"]:
        tags = set()
        for term in card["keywords"]:
            tags |= words(term)
        matched = query_tokens & (tags | words(card["title"]))
        if matched:
            direct[card["id"]] = matched

    ranking = []
    for card in graph["cards"]:
        cid = card["id"]
        direct_terms = direct.get(cid, set())
        connected = []
        for relation in graph["relations"]:
            if relation["from"] == cid and relation["to"] in direct:
                connected.append(relation["to"])
            elif relation["to"] == cid and relation["from"] in direct:
                connected.append(relation["from"])
        if not direct_terms and not connected:
            continue
        # Deterministic ordering to limit context, not confidence or empirical UX impact.
        rank = (0 if direct_terms else 1, -len(direct_terms), -len(connected), cid)
        ranking.append((rank, card, direct_terms, connected))

    ranking.sort(key=lambda item: item[0])
    selected = ranking[:max_cards]
    selected_ids = {c["id"] for _, c, _, _ in selected}
    cards = [{
        "id": c["id"], "author": people[c["author_id"]], "title": c["title"],
        "why_selected": "lexical_match" if terms else "associated_principle",
        "matched_terms": sorted(terms), "linked_from": sorted(links),
        "principle": c["principle"], "verify": c["verification"],
        "source": c["provenance"]["source_url"],
        "evidence_state": c["status"],
    } for _, c, terms, links in selected]
    tensions = [r for r in graph["relations"]
                if r["type"] == "tension" and r["from"] in selected_ids and r["to"] in selected_ids]
    return {
        "query": query,
        "retrieval": "deterministic_lexical_plus_one_hop_associations",
        "neural_network_trained": False,
        "field_ux_validated": False,
        "results": cards,
        "tensions_to_resolve": tensions,
        "notes": [
            "Source-mapped design principles are inspiration, not an empirical user study.",
            "Evaluate primary task success, accessibility and user feedback before aesthetic preference.",
            "No match means no verified selection; do not fabricate a winning designer.",
        ],
    }

def validate_feedback(path, graph):
    """Read review observations, without changing graph weights or inventing learning."""
    entries = json.loads(Path(path).read_text(encoding="utf-8"))
    ids = {c["id"] for c in graph["cards"]}
    assert isinstance(entries, list)
    for entry in entries:
        assert entry["rule_id"] in ids
        assert entry["result"] in {"helped", "did_not_help", "inconclusive"}
        assert entry["evidence_type"] in {"user_report", "observed_task", "expert_review"}
        assert isinstance(entry.get("context", ""), str)
    return {"observations_read": len(entries), "knowledge_updated": False,
            "promotion_requires": "human_review_and_regression_tests",
            "note": "Observations are unverified input and never silently change source attribution or rules."}

def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("query", nargs="?", default="")
    p.add_argument("--max-cards", type=int, choices=range(1, 9), default=5)
    p.add_argument("--feedback", type=Path, help="Optional de-identified observations JSON; read-only")
    args = p.parse_args()
    graph = load_graph()
    output = recommend(args.query, graph, args.max_cards)
    if args.feedback:
        output["feedback_review"] = validate_feedback(args.feedback, graph)
    print(json.dumps(output, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
