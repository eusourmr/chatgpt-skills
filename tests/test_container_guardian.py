import json
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GUARDIAN = ROOT / "runtime" / "container-guardian.mjs"
POLICY = json.loads((ROOT / "trust" / "containers" / "default.json").read_text(encoding="utf-8"))


class ContainerGuardianTests(unittest.TestCase):
    def base_payload(self):
        return {
            "policy": POLICY,
            "action": {
                "kind": "read",
                "capability": "catalog.read",
                "required_permissions": ["catalog.read"],
                "can_degrade": True,
            },
            "permissions": {
                "container": ["catalog.read", "tool.execute", "external.send", "workflow.spawn"],
                "authorized": ["catalog.read", "tool.execute", "external.send", "workflow.spawn"],
                "host": ["catalog.read", "tool.execute", "external.send", "workflow.spawn"],
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
                "attempts": {"used": 0, "limit": 3},
            },
        }

    def decide(self, payload):
        result = subprocess.run(
            ["node", str(GUARDIAN)],
            cwd=ROOT,
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, result.stderr)
        return json.loads(result.stdout)

    def test_authorized_action_is_allowed(self):
        out = self.decide(self.base_payload())
        self.assertEqual(out["decision"], "ALLOW")
        self.assertEqual(out["reason_code"], "ALLOW_AUTHORIZED")
        self.assertIsNone(out["stop_code"])

    def test_permission_self_escalation_stops(self):
        payload = self.base_payload()
        payload["action"]["requests_permission_escalation"] = True
        out = self.decide(payload)
        self.assertEqual(out["decision"], "STOP")
        self.assertEqual(out["reason_code"], "STOP_PERMISSION_ESCALATION")
        self.assertEqual(out["stop_code"], "CONTAINER_ESCAPE_ATTEMPT")

    def test_missing_effective_permission_stops(self):
        payload = self.base_payload()
        payload["action"]["required_permissions"] = ["external.send"]
        payload["permissions"]["authorized"] = ["catalog.read"]
        out = self.decide(payload)
        self.assertEqual(out["decision"], "STOP")
        self.assertEqual(out["reason_code"], "STOP_PERMISSION_DENIED")

    def test_fabricated_citation_stops(self):
        payload = self.base_payload()
        payload["evidence"]["fabrication"]["citation"] = True
        out = self.decide(payload)
        self.assertEqual(out["decision"], "STOP")
        self.assertEqual(out["reason_code"], "STOP_FABRICATION_DENIED")

    def test_prohibited_acquisition_stops(self):
        payload = self.base_payload()
        payload["action"]["acquisition_kind"] = "credential-theft"
        out = self.decide(payload)
        self.assertEqual(out["decision"], "STOP")
        self.assertEqual(out["reason_code"], "STOP_ACQUISITION_DENIED")

    def test_unauthorized_external_transfer_stops(self):
        payload = self.base_payload()
        payload["action"]["required_permissions"] = ["external.send"]
        payload["action"]["external_transfer"] = True
        payload["context"]["external_transfer_authorized"] = False
        out = self.decide(payload)
        self.assertEqual(out["decision"], "STOP")
        self.assertEqual(out["reason_code"], "STOP_EXTERNAL_TRANSFER_DENIED")

    def test_retry_budget_exhaustion_stops(self):
        payload = self.base_payload()
        payload["action"]["kind"] = "retry"
        payload["context"]["attempts"] = {"used": 3, "limit": 3}
        out = self.decide(payload)
        self.assertEqual(out["decision"], "STOP")
        self.assertEqual(out["reason_code"], "STOP_BUDGET_EXHAUSTED")

    def test_child_cannot_widen_parent(self):
        payload = self.base_payload()
        payload["action"].update({
            "kind": "spawn-child",
            "required_permissions": ["workflow.spawn"],
            "child_permissions": ["catalog.read", "external.send"],
        })
        payload["parent"] = {"effective_permissions": ["catalog.read", "workflow.spawn"]}
        out = self.decide(payload)
        self.assertEqual(out["decision"], "STOP")
        self.assertEqual(out["reason_code"], "STOP_CHILD_WIDENS_PARENT")
        self.assertEqual(out["stop_code"], "CONTAINER_ESCAPE_ATTEMPT")

    def test_missing_evidence_degrades_instead_of_inventing(self):
        payload = self.base_payload()
        payload["action"]["factual_claim"] = True
        payload["evidence"]["state"] = "missing"
        payload["evidence"]["supported"] = False
        out = self.decide(payload)
        self.assertEqual(out["decision"], "DEGRADE")
        self.assertEqual(out["reason_code"], "DEGRADE_MISSING_EVIDENCE")

    def test_source_conflict_degrades(self):
        payload = self.base_payload()
        payload["evidence"]["state"] = "conflict"
        out = self.decide(payload)
        self.assertEqual(out["decision"], "DEGRADE")
        self.assertEqual(out["reason_code"], "DEGRADE_SOURCE_CONFLICT")

    def test_destructive_action_requires_confirmation(self):
        payload = self.base_payload()
        payload["action"]["destructive"] = True
        payload["context"]["destructive_policy_authorized"] = True
        payload["context"]["confirmation_state"] = "missing"
        out = self.decide(payload)
        self.assertEqual(out["decision"], "CONFIRM")
        self.assertEqual(out["reason_code"], "CONFIRM_DESTRUCTIVE_ACTION")

    def test_confirmed_destructive_action_can_be_allowed(self):
        payload = self.base_payload()
        payload["action"]["destructive"] = True
        payload["context"]["destructive_policy_authorized"] = True
        payload["context"]["confirmation_state"] = "granted"
        out = self.decide(payload)
        self.assertEqual(out["decision"], "ALLOW")

    def test_unavailable_tool_degrades_when_safe(self):
        payload = self.base_payload()
        payload["action"].update({
            "kind": "tool-call",
            "tool": "example.read",
            "tool_declared": True,
            "required_permissions": ["tool.execute"],
        })
        payload["context"]["tool_available"] = False
        out = self.decide(payload)
        self.assertEqual(out["decision"], "DEGRADE")
        self.assertEqual(out["reason_code"], "DEGRADE_TOOL_UNAVAILABLE")


if __name__ == "__main__":
    unittest.main()
