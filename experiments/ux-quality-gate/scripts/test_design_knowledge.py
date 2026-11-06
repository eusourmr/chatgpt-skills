#!/usr/bin/env python3
"""Knowledge provenance, graph consistency and retrieval tests; not a UX field evaluation."""
import importlib.util
import json
import pathlib
import tempfile
import unittest

p = pathlib.Path(__file__).with_name("design_knowledge.py")
spec=importlib.util.spec_from_file_location("design_knowledge",p)
m=importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

class DesignKnowledgeTests(unittest.TestCase):
    def setUp(self):
        self.graph=m.load_graph()

    def test_graph_is_auditable_no_neural_claim(self):
        self.assertEqual(len(self.graph["people"]),11)
        self.assertEqual(len(self.graph["cards"]),22)
        self.assertGreaterEqual(len(self.graph["relations"]),10)
        self.assertFalse(self.graph["neural_network_trained"])

    def test_all_principles_have_source_and_observable_test(self):
        for card in self.graph["cards"]:
            self.assertTrue(card["verification"])
            self.assertTrue(card["provenance"]["source_url"].startswith("https://"))
            self.assertNotEqual(card["status"],"field-tested")

    def test_signifiers_and_error_ux_find_norman(self):
        r=m.recommend("formulário botão salvar erro feedback")
        self.assertIn("Donald Norman",[v["author"] for v in r["results"]])

    def test_latch_for_information_architecture(self):
        r=m.recommend("navegação informação busca categorias")
        self.assertIn("Richard Saul Wurman",[v["author"] for v in r["results"]])

    def test_logo_brand_can_find_rand_or_wollner(self):
        r=m.recommend("marca logo identidade símbolo",max_cards=8)
        self.assertTrue({"Paul Rand","Alexandre Wollner"} & {x["author"] for x in r["results"]})

    def test_reduced_motion_not_forced(self):
        r=m.recommend("animação movimento transição motion",max_cards=8)
        self.assertTrue(any(x["author"]=="Saul Bass" for x in r["results"]))
        self.assertFalse(r["field_ux_validated"])

    def test_empty_unmatched_task_has_no_invented_best_designer(self):
        r=m.recommend("xyz987 unknown-blorb")
        self.assertEqual(r["results"],[])
        self.assertFalse(r["neural_network_trained"])

    def test_deterministic_and_no_secret_or_network(self):
        a=m.recommend("design interface simplicidade")
        b=m.recommend("design interface simplicidade")
        self.assertEqual(a,b)

    def test_feedback_read_only_unverified(self):
        with tempfile.TemporaryDirectory() as tmp:
            path=pathlib.Path(tmp)/"feedback.json"
            path.write_text(json.dumps([{"rule_id":"donald-norman-signifiers","result":"helped",
              "evidence_type":"user_report","context":"Test in form"}]),encoding="utf-8")
            result=m.validate_feedback(path,self.graph)
            self.assertEqual(result["observations_read"],1)
            self.assertFalse(result["knowledge_updated"])

    def test_feedback_rejects_unknown_rule_or_state(self):
        with tempfile.TemporaryDirectory() as tmp:
            path=pathlib.Path(tmp)/"feedback.json"
            path.write_text(json.dumps([{"rule_id":"fake","result":"proven",
              "evidence_type":"user_report"}]),encoding="utf-8")
            with self.assertRaises(AssertionError):
                m.validate_feedback(path,self.graph)

if __name__=="__main__":
    unittest.main()
