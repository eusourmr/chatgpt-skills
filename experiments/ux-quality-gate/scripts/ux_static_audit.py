#!/usr/bin/env python3
"""Conservative offline HTML UX heuristics. Never claim WCAG conformance."""
from __future__ import annotations

import argparse
import json
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path


class Inspector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.nodes = []
        self.stack = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        node = {
            "tag": tag, "attrs": a, "line": self.getpos()[0], "text": "",
            "inside_label": any(n["tag"] == "label" for n in self.stack),
        }
        self.nodes.append(node)
        if tag == "img" and a.get("alt"):
            for n in self.stack:
                if n["tag"] in ("a", "button"):
                    n["text"] += " " + a["alt"]
        # HTML void elements never participate in the open-element stack.
        if tag not in ("area", "base", "br", "col", "embed", "hr", "img",
                       "input", "link", "meta", "param", "source", "track", "wbr"):
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack and self.stack[-1]["tag"] == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i]["tag"] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        for n in self.stack:
            if n["tag"] in ("button", "a"):
                n["text"] += data


def audit_html(source: str) -> dict:
    parser = Inspector()
    parser.feed(source)
    nodes = parser.nodes
    findings = []

    def add(rule, severity, line, detail, evidence="static_heuristic"):
        findings.append({"rule": rule, "severity": severity, "line": line,
                         "detail": detail, "evidence": evidence})

    html = next((n for n in nodes if n["tag"] == "html"), None)
    if not html or not (html["attrs"].get("lang") or "").strip():
        add("html-language", "medium", html["line"] if html else 1,
            "No explicit document language; check localized screen reader behavior.")

    viewports = [n for n in nodes if n["tag"] == "meta"
                 and (n["attrs"].get("name") or "").lower() == "viewport"]
    if not viewports:
        add("responsive-viewport", "medium", 1,
            "No viewport meta found in the inspected HTML.")
    else:
        val = (viewports[0]["attrs"].get("content") or "").lower().replace(" ", "")
        if re.search(r"user-scalable=(?:no|0)|maximum-scale=1(?:[,.]|$)", val):
            add("zoom-restricted", "high", viewports[0]["line"],
                "Viewport restricts user zoom; confirm this is removed.")

    if not any(n["tag"] == "main" or n["attrs"].get("role") == "main" for n in nodes):
        add("main-landmark", "low", 1,
            "No main landmark found. Confirm the primary content has a navigable landmark.")

    ids = Counter((n["attrs"].get("id") or "") for n in nodes if n["attrs"].get("id"))
    for value, count in sorted(ids.items()):
        if count > 1:
            line = next(n["line"] for n in nodes if n["attrs"].get("id") == value)
            add("duplicate-id", "high", line, f"Duplicate id: {value} ({count} occurrences).")

    labelled_for = {n["attrs"].get("for") for n in nodes if n["tag"] == "label"}
    for n in nodes:
        a = n["attrs"]
        if n["tag"] == "img" and "alt" not in a:
            add("image-alt", "high", n["line"],
                "Image has no alt attribute; choose descriptive alt or empty alt for decoration.")
        if n["tag"] in ("button", "a") and (n["tag"] == "button" or "href" in a):
            has_name = (n["text"].strip() or (a.get("aria-label") or "").strip()
                        or (a.get("aria-labelledby") or "").strip())
            if not has_name:
                add("interactive-name", "high", n["line"],
                    f"{n['tag']} appears to lack an accessible name in inspected HTML.")
        if n["tag"] in ("input", "select", "textarea"):
            if n["tag"] == "input" and (a.get("type") or "").lower() in ("hidden", "submit", "button", "reset", "image"):
                continue
            named = (a.get("id") in labelled_for or n["inside_label"] or
                     (a.get("aria-label") or "").strip() or
                     (a.get("aria-labelledby") or "").strip())
            if not named:
                add("form-name", "high", n["line"],
                    f"{n['tag']} lacks a linked or enclosing label in static markup.")
        if n["tag"] in ("div", "span") and "onclick" in a:
            if a.get("role") not in ("button", "link", "checkbox", "switch"):
                add("nonsemantic-click", "medium", n["line"],
                    "Clickable generic element; check keyboard operation and native semantics.")
    for match in re.finditer(r"\boutline\s*:\s*(?:none|0)(?:\s*[;}]|$)", source, re.IGNORECASE):
        line = source.count("\n", 0, match.start()) + 1
        add("focus-outline-review", "medium", line,
            "Focus outline removed somewhere in source; verify an adequate visible replacement.")

    return {
        "assessment": "static_heuristics_only",
        "wcag_conformance_certified": False,
        "runtime_ux_verified": False,
        "notes": ["Dynamic UI, external CSS, keyboard operation, screen readers and real user tasks require separate tests.",
                  "A finding is a review lead, not always an actual defect; no findings is not a pass."],
        "findings": sorted(findings, key=lambda f: (f["line"], f["rule"])),
    }


def main():
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("html_file", type=Path, help="Locally authorized HTML file")
    cli.add_argument("--format", choices=("json", "text"), default="json")
    args = cli.parse_args()
    try:
        result = audit_html(args.html_file.read_text(encoding="utf-8"))
    except (OSError, UnicodeError) as exc:
        cli.error(str(exc))
    if args.format == "json":
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print("STATIC HEURISTICS ONLY — not a WCAG certification")
        for f in result["findings"]:
            print(f"{f['line']}: {f['severity'].upper()} {f['rule']} — {f['detail']}")
        if not result["findings"]:
            print("No heuristic findings; manual and runtime checks still required.")


if __name__ == "__main__":
    main()
