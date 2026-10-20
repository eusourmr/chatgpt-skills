/**
 * CS Navigator 0.18 development — Capability Fulfillment Contract.
 *
 * Registry discovery, packaging, activation and observed execution are distinct.
 * This pure classifier never asserts that a remote skill file was executed.
 * Do not interpret 'bundled_core' as proof of installation in the current chat.
 */

export const BUNDLED_CORE_IDS: ReadonlySet<string> = new Set([
  "cs-navigator",
  "personal-curator",
  "simple-mode",
  "capability-preferences",
  "proof-of-progress",
  "information-expiry-guard",
]);

export type CapabilityRecord = {
  id: string;
  name?: string;
  distribution_state?: string;
  evidence_state: string;
  qualification_state?: string;
  freshness_state?: string;
  known_gaps?: string[];
};

export type DeliveryAssessment = {
  id: string;
  found: boolean;
  delivery_state: "not_available" | "bundled_core" | "registry_only";
  host_activation_verified: false;
  execution_verified: false;
  evidence_state: string | null;
  qualification_state: string | null;
  freshness_state: string | null;
  known_gaps: string[];
  next_action: string;
  boundary: string;
};

export function assessCapabilityFulfillment(
  requestedId: string,
  record: CapabilityRecord | undefined,
): DeliveryAssessment {
  const boundary =
    "Catalog presence and successful MCP discovery do not prove host installation, activation, execution, safety, or user outcomes.";
  const base = {
    id: requestedId,
    host_activation_verified: false as const,
    execution_verified: false as const,
    evidence_state: record?.evidence_state ?? null,
    qualification_state: record?.qualification_state ?? null,
    freshness_state: record?.freshness_state ?? null,
    known_gaps: Array.isArray(record?.known_gaps) ? [...record.known_gaps] : [],
    boundary,
  };

  // Excluded records must not be routed through a differently named skill.
  if (!record || record.id !== requestedId || record.distribution_state !== "available") {
    return {
      ...base,
      found: false,
      delivery_state: "not_available",
      next_action:
        "Do not offer or execute this capability through the public CS Navigator. Use native assistance where appropriate without bypassing exclusions.",
    };
  }

  if (BUNDLED_CORE_IDS.has(record.id)) {
    return {
      ...base,
      found: true,
      delivery_state: "bundled_core",
      next_action:
        "This skill belongs to the published core manifest. Confirm the user has the plugin enabled and observe a real invocation before claiming execution.",
    };
  }

  return {
    ...base,
    found: true,
    delivery_state: "registry_only",
    next_action:
      "This is discoverable metadata only. Do not claim the skill is installed or running. Offer a native alternative or a host-supported, explicitly authorized activation path.",
  };
}
