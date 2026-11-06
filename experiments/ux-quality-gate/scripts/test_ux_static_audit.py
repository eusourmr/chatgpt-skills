#!/usr/bin/env python3
"""Offline regression tests of conservative HTML heuristics, not UX outcome tests."""
import importlib.util
import pathlib
import unittest

tool = pathlib.Path(__file__).with_name("ux_static_audit.py")
spec = importlib.util.spec_from_file_location("ux_static_audit", tool)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

PREFIX = '<!doctype html><html lang="pt-BR"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><main>'
SUFFIX = '</main></body></html>'

class TestUxStaticAudit(unittest.TestCase):
    def codes(self, html):
        return {f["rule"] for f in module.audit_html(html)["findings"]}

    def test_clean_sample_has_no_heuristic_findings_but_no_certification(self):
        html = PREFIX + '<label for="email">Email</label><input id="email"><button>Enviar</button><a href="/ajuda">Ajuda</a><img alt="" src="decoration.svg">' + SUFFIX
        result = module.audit_html(html)
        self.assertEqual(result["findings"], [])
        self.assertFalse(result["wcag_conformance_certified"])
        self.assertFalse(result["runtime_ux_verified"])

    def test_missing_names_images_and_label_detected(self):
        html = PREFIX + '<img src="photo.jpg"><button><svg></svg></button><a href="/x"></a><input type="text">' + SUFFIX
        self.assertTrue({"image-alt","interactive-name","form-name"}.issubset(self.codes(html)))

    def test_zoom_disabling_and_duplicate_ids(self):
        html = '<html><head><meta name="viewport" content="width=device-width,user-scalable=no,maximum-scale=1"></head><body><main><p id="a"></p><p id="a"></p></main></body></html>'
        self.assertTrue({"zoom-restricted","duplicate-id","html-language"}.issubset(self.codes(html)))

    def test_empty_alt_and_image_link_name_are_allowed(self):
        html = PREFIX + '<a href="/"><img alt="Início" src="home.svg"></a><img alt="" src="decor.svg">' + SUFFIX
        self.assertNotIn("image-alt", self.codes(html))
        self.assertNotIn("interactive-name", self.codes(html))

    def test_inline_label_and_hidden_input(self):
        html = PREFIX + '<label>Nome<input></label><input type="hidden" value="x">' + SUFFIX
        self.assertNotIn("form-name", self.codes(html))

    def test_focus_outline_only_review_not_certification(self):
        result = module.audit_html(PREFIX + "<style>button:focus{outline:none}</style>" + SUFFIX)
        self.assertIn("focus-outline-review", {x["rule"] for x in result["findings"]})
        self.assertFalse(result["wcag_conformance_certified"])

if __name__ == "__main__":
    unittest.main()
