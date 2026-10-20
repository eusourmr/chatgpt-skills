import assert from "node:assert/strict";
import { test } from "node:test";
import { assessCapabilityFulfillment, BUNDLED_CORE_IDS, isExperimentalDeliveryToolEnabled } from "../dist/fulfillment.js";

const record = (id, overrides = {}) => ({
  id,
  distribution_state: "available",
  evidence_state: "designed",
  qualification_state: "designed",
  freshness_state: "current",
  known_gaps: ["No native semantic run."],
  ...overrides,
});

test("the stable core has exactly six distinct identifiers", () => {
  assert.equal(BUNDLED_CORE_IDS.size, 6);
  assert.ok(BUNDLED_CORE_IDS.has("cs-navigator"));
  assert.ok(BUNDLED_CORE_IDS.has("information-expiry-guard"));
});

test("registry-only skill is discoverable but not claimed installed or executed", () => {
  const out = assessCapabilityFulfillment(
    "learning-mastery-coach",
    record("learning-mastery-coach"),
  );
  assert.equal(out.found, true);
  assert.equal(out.delivery_state, "registry_only");
  assert.equal(out.host_activation_verified, false);
  assert.equal(out.execution_verified, false);
  assert.equal(out.evidence_state, "designed");
  assert.match(out.next_action, /metadata only/i);
});

test("bundled core means package declaration, not host invocation evidence", () => {
  const out = assessCapabilityFulfillment("personal-curator", record("personal-curator"));
  assert.equal(out.delivery_state, "bundled_core");
  assert.equal(out.host_activation_verified, false);
  assert.equal(out.execution_verified, false);
  assert.match(out.next_action, /confirm.*enabled/i);
});

test("a tested record cannot be promoted into observed execution", () => {
  const out = assessCapabilityFulfillment(
    "some-reviewed-capability",
    record("some-reviewed-capability", {
      evidence_state: "tested",
      qualification_state: "tested",
    }),
  );
  assert.equal(out.evidence_state, "tested");
  assert.equal(out.execution_verified, false);
  assert.equal(out.delivery_state, "registry_only");
});

test("unknown capability is not available", () => {
  const out = assessCapabilityFulfillment("nonexistent", undefined);
  assert.equal(out.found, false);
  assert.equal(out.delivery_state, "not_available");
  assert.equal(out.evidence_state, null);
});

test("excluded healthcare skills cannot be offered, even if the source record exists", () => {
  for (const id of ["medical-appointment-prep", "caregiver-coordinator"]) {
    const out = assessCapabilityFulfillment(
      id,
      record(id, { distribution_state: "excluded" }),
    );
    assert.equal(out.found, false);
    assert.equal(out.delivery_state, "not_available");
    assert.equal(out.execution_verified, false);
    assert.match(out.next_action, /without bypassing exclusions/i);
  }
});

test("ID mismatches fail closed", () => {
  const out = assessCapabilityFulfillment("academic-writing-navigator", record("different-id"));
  assert.equal(out.found, false);
  assert.equal(out.delivery_state, "not_available");
});

test("unmarked distribution does not get silently promoted", () => {
  const out = assessCapabilityFulfillment(
    "learning-mastery-coach",
    record("learning-mastery-coach", { distribution_state: undefined }),
  );
  assert.equal(out.found, false);
});

test("known gaps and freshness are preserved without fabricating confidence", () => {
  const out = assessCapabilityFulfillment(
    "academic-writing-navigator",
    record("academic-writing-navigator", {
      freshness_state: "unknown",
      known_gaps: ["Norm profile missing", "No semantic run"],
    }),
  );
  assert.deepEqual(out.known_gaps, ["Norm profile missing", "No semantic run"]);
  assert.equal(out.freshness_state, "unknown");
  assert.equal("confidence_score" in out, false);
});

test("the assessment never treats a registry lookup as proof of outcome", () => {
  const out = assessCapabilityFulfillment("learning-mastery-coach", record("learning-mastery-coach"));
  assert.match(out.boundary, /do not prove.*user outcomes/i);
});

test("the experimental 0.18 tool requires an exact explicit opt-in", () => {
  for (const value of [undefined, "", "false", "TRUE", "1", " true ", "enabled"]) {
    assert.equal(isExperimentalDeliveryToolEnabled(value), false);
  }
  assert.equal(isExperimentalDeliveryToolEnabled("true"), true);
});
