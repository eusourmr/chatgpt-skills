"""Regression for public project positioning and accurate release-state communication.
This checks repository text only, not real host routing or automatic updates.
"""
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
TAGLINE="CS Navigator é o canivete suíço para quem quer usar o ChatGPT ao máximo."

class PublicStatusCopy(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.en=(ROOT/"README.md").read_text(encoding="utf-8")
        cls.pt=(ROOT/"README.pt-BR.md").read_text(encoding="utf-8")
        cls.guide=(ROOT/"docs/GETTING_STARTED.md").read_text(encoding="utf-8")
        cls.guide_pt=(ROOT/"docs/GETTING_STARTED.pt-BR.md").read_text(encoding="utf-8")
        cls.roadmap=(ROOT/"ROADMAP.md").read_text(encoding="utf-8")
        cls.audit=(ROOT/"docs/CS_AUDIT_AND_POSITIONING_2026-11-23.md").read_text(encoding="utf-8")

    def test_tagline_is_present_and_not_confused_with_plugin_guarantee(self):
        for value in (self.en,self.pt,self.roadmap,self.audit):
            self.assertIn(TAGLINE,value)
        self.assertIn("não",self.pt.lower())
        self.assertIn("não",self.audit.lower())

    def test_both_readmes_report_installed_beta8_but_reject_fake_qualification(self):
        for value in (self.en,self.pt):
            self.assertIn("0.20.0-beta.8",value)
            self.assertIn("0.17.0",value)
            self.assertIn("0.20.0-beta.4",value)
        self.assertIn("automatic skill routing",self.en)
        self.assertIn("roteamento automático",self.pt)

    def test_guides_are_synced_with_current_personal_plugin_status(self):
        for guide in (self.guide,self.guide_pt):
            self.assertIn("0.20.0-beta.8",guide)
            self.assertIn("2026-11-23" if guide is self.guide else "23/11/2026",guide)
            self.assertIn("CS_AUDIT_AND_POSITIONING_2026-11-23.md",guide)

    def test_audit_retains_real_provenance_gap_and_host_boundary(self):
        self.assertIn("source_commit=development",self.audit)
        self.assertIn("F3.1/CUR08",self.audit)
        self.assertIn("F3.2",self.audit)
        self.assertIn("0.20.0-beta.8",self.audit)
        self.assertIn("Fase 3",self.roadmap)
        self.assertIn("0.20.0-beta.8",self.roadmap)

if __name__=="__main__":
    unittest.main()
