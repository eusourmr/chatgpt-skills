import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { gitBlobHash, verifyPublication } from "../dist/provenance.js";

const source = readFileSync(new URL("../../../registry/public-capabilities-v1.json", import.meta.url), "utf8");
const manifest = JSON.parse(readFileSync(new URL("../../../registry/publication-manifest-v1.json", import.meta.url), "utf8"));
const url = "https://raw.githubusercontent.com/eusourmr/chatgpt-skills/main/registry/public-capabilities-v1.json";

test("immutable source snapshot matches the exact historical Git blob", () => {
  assert.equal(gitBlobHash(source), "96128c4ef9bbc09415e01c09d6e7aa64bb115877");
  const result = verifyPublication(source, manifest, url);
  assert.equal(result.verified_source_commit, "946723c75683021ab5e733e83c08aa44522f540d");
  assert.equal(result.provenance_state, "snapshot_content_verified_original_publication_unknown");
  assert.equal(result.original_publication_commit_verified, false);
  assert.equal(result.raw_source_commit, "development");
  assert.equal(result.source_snapshot_reviewed_date, "2026-11-23");
});
test("rejects any registry body drift", () => {
  assert.throws(() => verifyPublication(source.replace("academic-integrity-reviewer", "altered-id"), manifest, url), /diverged/);
  assert.throws(() => verifyPublication(source + "\n", manifest, url), /diverged/);
});
test("rejects fabricated revision or endpoint", () => {
  const changed = {...manifest, source_commit: "f".repeat(40)};
  assert.throws(() => verifyPublication(source, changed, url), /manifest validation/);
  assert.throws(() => verifyPublication(source, manifest, "https://example.com/registry.json"), /manifest validation/);
  assert.throws(() => verifyPublication(source, {...manifest, actual_original_publication_commit_verified: true}, url), /manifest validation/);
  assert.throws(() => verifyPublication(source, {...manifest, source_git_blob_sha1: "0".repeat(40)}, url), /diverged/);
});
test("does not confuse source content pin with 2026-10-11 publication provenance", () => {
  const result = verifyPublication(source, manifest, url);
  assert.notEqual(result.verified_source_commit, "development");
  assert.equal(result.original_publication_commit_verified, false);
  assert.match(result.pinned_source_url, /946723c75683021ab5e733e83c08aa44522f540d/);
});
