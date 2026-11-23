/**
 * Registry provenance is a VERIFIED SNAPSHOT CONTENT claim, not evidence that
 * the original historical publication happened at the pinned commit.
 *
 * Git blobs have an exact SHA-1 envelope ("blob <byte-length>\0" + bytes).
 * Do not trust source_commit strings embedded inside mutable registry JSON.
 */
import { createHash } from "node:crypto";

export type PublicationManifest = {
  schema_version: number;
  product: string;
  source_repository: string;
  source_path: string;
  source_commit: string;
  source_git_blob_sha1: string;
  immutable_source_url: string;
  mutable_source_url: string;
  catalog_publication_date_claim: string;
  source_snapshot_reviewed_date: string;
  actual_original_publication_commit_verified: boolean;
  provenance_scope: string;
  distribution_capabilities_expected: number;
  read_only: boolean;
  rollback: string;
};

const REVISION = /^[0-9a-f]{40}$/;
const ROOT = "https://raw.githubusercontent.com/eusourmr/chatgpt-skills/";
const PATH = "registry/public-capabilities-v1.json";

export function gitBlobHash(contents: string): string {
  const size = Buffer.byteLength(contents, "utf8");
  return createHash("sha1")
    .update("blob " + size + "\0", "utf8")
    .update(contents, "utf8")
    .digest("hex");
}

export function verifyPublication(
  registryText: string,
  candidate: unknown,
  sourceUrl: string,
): { verified_source_commit: string; source_blob_sha1: string; provenance_state: string; raw_source_commit: string; original_publication_commit_verified: false; pinned_source_url: string; source_snapshot_reviewed_date: string } {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate))
    throw new Error("Registry publication manifest unavailable");
  const manifest = candidate as PublicationManifest;
  if (manifest.schema_version !== 1 || manifest.product !== "CS Navigator" ||
      manifest.source_repository !== "https://github.com/eusourmr/chatgpt-skills" ||
      manifest.source_path !== PATH ||
      !REVISION.test(manifest.source_commit) ||
      !REVISION.test(manifest.source_git_blob_sha1) ||
      manifest.immutable_source_url !== ROOT + manifest.source_commit + "/" + PATH ||
      manifest.mutable_source_url !== ROOT + "main/" + PATH ||
      sourceUrl !== manifest.mutable_source_url ||
      manifest.actual_original_publication_commit_verified !== false ||
      manifest.read_only !== true ||
      manifest.distribution_capabilities_expected !== 61 ||
      manifest.provenance_scope !== "current_registry_bytes_match_git_blob_at_pinned_commit_not_original_publication_proof" ||
      manifest.catalog_publication_date_claim !== "2026-10-11" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(manifest.source_snapshot_reviewed_date)) {
    throw new Error("Registry publication manifest validation failed");
  }
  if (registryText.length > 300_000 || !registryText.trim()) {
    throw new Error("Registry snapshot missing or oversized");
  }
  const actualBlob = gitBlobHash(registryText);
  if (actualBlob !== manifest.source_git_blob_sha1)
    throw new Error("Registry content diverged from pinned Git blob");
  const raw = JSON.parse(registryText) as Record<string, unknown>;
  if (raw.published_at !== manifest.catalog_publication_date_claim ||
      raw.product !== manifest.product ||
      !Array.isArray(raw.entries)) {
    throw new Error("Registry publication metadata does not match pinned snapshot");
  }
  const visible = raw.entries.filter((entry) =>
    entry && typeof entry === "object" &&
    (entry as Record<string, unknown>).distribution_state !== "excluded").length;
  if (visible !== manifest.distribution_capabilities_expected)
    throw new Error("Distribution capability count changed");
  return {
    verified_source_commit: manifest.source_commit,
    source_blob_sha1: actualBlob,
    provenance_state: "snapshot_content_verified_original_publication_unknown",
    raw_source_commit: typeof raw.source_commit === "string" ? raw.source_commit : "unknown",
    original_publication_commit_verified: false,
    pinned_source_url: manifest.immutable_source_url,
    source_snapshot_reviewed_date: manifest.source_snapshot_reviewed_date,
  };
}
