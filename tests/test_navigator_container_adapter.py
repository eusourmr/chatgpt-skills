import json
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ADAPTER = ROOT / "runtime" / "navigator-container-adapter.mjs"


class NavigatorContainerAdapterTests(unittest.TestCase):
    def base_payload(self):
        return {
            "route": {
                "outcome": "skill",
                "selected_skill_ids": ["regenerative-impact-map"],
                "native_sufficient": False,
                "proposed_action": {
                    "kind": "read",
                    "capability": "catalog.read",
                    "required_permissions": ["catalog.read"],
                },
            },
            "guard": {
                "permissions": {
                    "container": ["catalog.read", "external.send", "data.delete"],
                    "authorized": ["catalog.read", "external.send", "data.delete"],
                    "host": ["catalog.read", "external.send", "data.delete"],
                },
                "evidence": {
                    "state": "available",
                    "supported": True,
                    "fabrication": {
                        "citation": False,
                        "observation": False,
                        "tool_result": False,
                    },
                },
                "context": {
                    "confirmation_state": "not-required",
                    "tool_available": True,
                },
            },
        }

    def run_adapter(self, payload):
        result = subprocess.run(
            ["node", str(ADAPTER)],
            cwd=ROOT,
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        return json.loads(result.stdout)

    def test_allow_proceeds_without_widening(self):
        out = self.run_adapter(self.base_payload())
        self.assertEqual(out["guardian"]["decision"], "ALLOW")
        self.assertEqual(out["execution"]["state"], "proceed")
        self.assertFalse(out["execution"]["may_auto_widen_permissions"])
        self.assertTrue(out["execution"]["alternative_path_requires_new_guardian_decision"])

    def test_stop_cannot_be_auto_bypassed(self):
        payload = self.base_payload()
        payload["route"]["proposed_action"] = {
            "kind": "send",
            "capability": "external.send",
            "required_permissions": ["external.send"],
            "external_transfer": True,
        }
        payload["guard"]["context"]["external_transfer_authorized"] = False
        out = self.run_adapter(payload)
        self.assertEqual(out["guardian"]["decision"], "STOP")
        self.assertEqual(out["execution"]["state"], "stop")
        self.assertFalse(out["execution"]["may_auto_bypass_stop"])
        self.assertFalse(out["execution"]["may_auto_retry_after_stop"])

    def test_degrade_returns_bounded_result(self):
        payload = self.base_payload()
        payload["route"]["proposed_action"] = {
            "kind": "claim",
            "capability": "answer.fact",
            "required_permissions": [],
            "factual_claim": True,
            "can_degrade": True,
        }
        payload["guard"]["permissions"] = {"container": [], "authorized": [], "host": []}
        payload["guard"]["evidence"]["state"] = "missing"
        payload["guard"]["evidence"]["supported"] = False
        out = self.run_adapter(payload)
        self.assertEqual(out["guardian"]["decision"], "DEGRADE")
        self.assertEqual(out["execution"]["state"], "bounded-result")

    def test_confirmation_waits_for_user(self):
        payload = self.base_payload()
        payload["route"]["proposed_action"] = {
            "kind": "write",
            "capability": "data.delete",
            "required_permissions": ["data.delete"],
            "destructive": True,
        }
        payload["guard"]["context"]["destructive_policy_authorized"] = True
        payload["guard"]["context"]["confirmation_state"] = "missing"
        out = self.run_adapter(payload)
        self.assertEqual(out["guardian"]["decision"], "CONFIRM")
        self.assertEqual(out["execution"]["state"], "await-confirmation")

    def test_native_only_route_is_preserved(self):
        payload = self.base_payload()
        payload["route"]["outcome"] = "native-only"
        payload["route"]["selected_skill_ids"] = []
        payload["route"]["native_sufficient"] = True
        out = self.run_adapter(payload)
        self.assertTrue(out["navigator"]["native_first_preserved"])
        self.assertEqual(out["navigator"]["selected_skill_ids"], [])


if __name__ == "__main__":
    unittest.main()
