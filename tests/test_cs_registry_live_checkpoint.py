"""Cross-check observed live Registry metadata against immutable publication manifest.

This compares a recorded connected-tool result; it does not re-invoke the live
server, certify a historical publication date, or qualify CS host routing.
"""
import json
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
MANIFEST=ROOT/"registry/publication-manifest-v1.json"
OBSERVED=ROOT/"trust/qualification/registry/live-provenance-checkpoint-2026-11-23.json"

class LiveProvenanceCheckpoint(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.m=json.loads(MANIFEST.read_text(encoding="utf-8"))
        cls.o=json.loads(OBSERVED.read_text(encoding="utf-8"))
        cls.v=cls.o["checked_fields"]
    def test_snapshot_identity_matches_declared_pin(self):
        self.assertEqual(self.v["source_commit"], self.m["source_commit"])
        self.assertEqual(self.v["source_git_blob_sha1"],self.m["source_git_blob_sha1"])
        self.assertEqual(self.v["published_at"],self.m["catalog_publication_date_claim"])
        self.assertEqual(self.v["source_snapshot_reviewed_date"],self.m["source_snapshot_reviewed_date"])
        self.assertEqual(self.v["capability_count"],self.m["distribution_capabilities_expected"])
    def test_publication_history_is_not_falsified(self):
        self.assertEqual(self.v["raw_source_commit"],"development")
        self.assertFalse(self.v["original_publication_commit_verified"])
        self.assertFalse(self.m["actual_original_publication_commit_verified"])
        self.assertEqual(self.v["provenance_state"],"snapshot_content_verified_original_publication_unknown")
    def test_observed_tools_are_not_labeled_host_routing(self):
        self.assertEqual(self.o["capture_kind"],"connected_mcp_tool_result_transcription")
        self.assertEqual(self.o["assessment"]["host_curator_automatic_routing"],"not_tested_by_these_calls")
        self.assertEqual(self.o["assessment"]["ab_benefit"],"not_tested_by_these_calls")
        self.assertEqual(len(self.o["additional_tool_checks"]),3)
        self.assertEqual(self.o["additional_tool_checks"][1]["outcome"],"found_false_as_excluded")

if __name__=="__main__":
    unittest.main()
