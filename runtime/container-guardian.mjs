#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const DECISION = Object.freeze({
  ALLOW: 'ALLOW',
  CONFIRM: 'CONFIRM',
  DEGRADE: 'DEGRADE',
  STOP: 'STOP'
});

const POLICY_DECISION = Object.freeze({
  ALLOW: 'allow',
  CONFIRM: 'allow-with-confirmation',
  DEGRADE: 'degrade',
  STOP: 'stop'
});

const REASONS = Object.freeze({
  ALLOW_AUTHORIZED: 'Action is within the effective permission set and no container boundary was triggered.',
  CONFIRM_DESTRUCTIVE_ACTION: 'The action is permitted by policy but requires explicit confirmation before execution.',
  CONFIRM_REQUIRED: 'The action requires explicit confirmation before execution.',
  DEGRADE_MISSING_EVIDENCE: 'Required evidence is missing, so the result must remain bounded and must not be presented as fact.',
  DEGRADE_SOURCE_CONFLICT: 'Available sources conflict, so the conflict must be surfaced instead of silently resolved.',
  DEGRADE_TOOL_UNAVAILABLE: 'The requested tool is unavailable, but a bounded partial result is possible.',
  STOP_INVALID_RUNTIME_CONTEXT: 'The runtime context is incomplete or invalid for a fail-closed decision.',
  STOP_PERMISSION_DENIED: 'The action requires permission outside the effective permission set.',
  STOP_PERMISSION_ESCALATION: 'The action attempts to widen permissions at runtime.',
  STOP_UNDECLARED_TOOL: 'The action attempts to use a tool that was not declared for this execution.',
  STOP_FABRICATION_DENIED: 'The action relies on a fabricated citation, observation, or tool result.',
  STOP_ACQUISITION_DENIED: 'The action attempts a prohibited or unauthorized acquisition path.',
  STOP_EXTERNAL_TRANSFER_DENIED: 'The action attempts an external transfer without explicit authorization.',
  STOP_SECRET_USE_DENIED: 'The action attempts to access or transfer secrets without explicit authorization.',
  STOP_CROSS_USER_DATA_DENIED: 'The action attempts to use data belonging to another user without authorization.',
  STOP_CROSS_TASK_CONTEXT_DENIED: 'The action attempts to reuse private context from another task without explicit authorization.',
  STOP_BUDGET_LIMIT_MISSING: 'A bounded retry/tool-attempt policy is required but no attempt limit was supplied.',
  STOP_BUDGET_EXHAUSTED: 'The bounded retry/tool-attempt budget is exhausted.',
  STOP_CHILD_WIDENS_PARENT: 'A child workflow may not widen the effective permissions of its parent.',
  STOP_DESTRUCTIVE_NOT_AUTHORIZED: 'A destructive action is not explicitly authorized by policy and runtime context.',
  STOP_TOOL_UNAVAILABLE: 'The requested tool is unavailable and no bounded degradation path exists.',
  STOP_EVIDENCE_EXHAUSTED: 'The action requires evidence that is unavailable and cannot safely degrade.'
});

const STOP_CODE_FOR_REASON = Object.freeze({
  STOP_INVALID_RUNTIME_CONTEXT: 'POLICY_BOUNDARY',
  STOP_PERMISSION_DENIED: 'PERMISSION_DENIED',
  STOP_PERMISSION_ESCALATION: 'CONTAINER_ESCAPE_ATTEMPT',
  STOP_UNDECLARED_TOOL: 'PERMISSION_DENIED',
  STOP_FABRICATION_DENIED: 'POLICY_BOUNDARY',
  STOP_ACQUISITION_DENIED: 'POLICY_BOUNDARY',
  STOP_EXTERNAL_TRANSFER_DENIED: 'PERMISSION_DENIED',
  STOP_SECRET_USE_DENIED: 'PERMISSION_DENIED',
  STOP_CROSS_USER_DATA_DENIED: 'POLICY_BOUNDARY',
  STOP_CROSS_TASK_CONTEXT_DENIED: 'POLICY_BOUNDARY',
  STOP_BUDGET_LIMIT_MISSING: 'POLICY_BOUNDARY',
  STOP_BUDGET_EXHAUSTED: 'BUDGET_EXHAUSTED',
  STOP_CHILD_WIDENS_PARENT: 'CONTAINER_ESCAPE_ATTEMPT',
  STOP_DESTRUCTIVE_NOT_AUTHORIZED: 'PERMISSION_DENIED',
  STOP_TOOL_UNAVAILABLE: 'TOOL_UNAVAILABLE',
  STOP_EVIDENCE_EXHAUSTED: 'EVIDENCE_EXHAUSTED'
});

const PROHIBITED_ACQUISITION = new Set([
  'credential-theft',
  'secret-harvesting',
  'unauthorized-access',
  'authentication-bypass',
  'authorization-bypass',
  'privilege-escalation',
  'stealth-persistence'
]);

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const stringArray = (value) => Array.isArray(value) && value.every((item) => typeof item === 'string');
const unique = (items) => [...new Set(items)].sort();
const subset = (need, have) => need.every((item) => have.includes(item));
const intersection = (...sets) => {
  if (!sets.length) return [];
  const [first, ...rest] = sets.map((set) => unique(set));
  return first.filter((item) => rest.every((set) => set.includes(item))).sort();
};

function decisionRecord(policy, input, decision, reasonCode, effectivePermission = []) {
  const action = input.action ?? {};
  const evidence = input.evidence ?? {};
  const context = input.context ?? {};
  const stopCode = decision === DECISION.STOP ? (STOP_CODE_FOR_REASON[reasonCode] ?? 'POLICY_BOUNDARY') : null;

  return {
    container_id: policy?.container_id ?? null,
    decision,
    policy_decision: POLICY_DECISION[decision],
    reason_code: reasonCode,
    reason: REASONS[reasonCode] ?? REASONS.STOP_INVALID_RUNTIME_CONTEXT,
    requested_capability: action.capability ?? action.kind ?? null,
    effective_permission: unique(effectivePermission),
    evidence_state: evidence.state ?? 'not-provided',
    confirmation_state: context.confirmation_state ?? 'not-provided',
    stop_code: stopCode
  };
}

function invalid(policy, input) {
  return decisionRecord(policy, input, DECISION.STOP, 'STOP_INVALID_RUNTIME_CONTEXT');
}

export function evaluateContainerAction(input) {
  if (!isObject(input)) return invalid(null, {});
  const policy = input.policy ?? input.container;
  const action = input.action;
  const permissions = input.permissions;
  const evidence = input.evidence ?? {};
  const context = input.context ?? {};
  const parent = input.parent ?? null;

  if (!isObject(policy) || !isObject(action) || !isObject(permissions)) return invalid(policy, input);
  if (!stringArray(action.required_permissions ?? [])) return invalid(policy, input);
  if (!stringArray(permissions.container) || !stringArray(permissions.authorized) || !stringArray(permissions.host)) {
    return invalid(policy, input);
  }

  const required = unique(action.required_permissions ?? []);
  const effective = intersection(permissions.container, permissions.authorized, permissions.host);

  if (policy.principles?.self_escalation === false && action.requests_permission_escalation === true) {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_PERMISSION_ESCALATION', effective);
  }

  if (action.tool && action.tool_declared !== true && policy.capability_boundary?.undeclared_tool === 'deny') {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_UNDECLARED_TOOL', effective);
  }

  if (!subset(required, effective)) {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_PERMISSION_DENIED', effective);
  }

  const fabrication = evidence.fabrication ?? {};
  if (
    (fabrication.citation === true && policy.epistemic_boundary?.fabricated_citations === 'deny') ||
    (fabrication.observation === true && policy.epistemic_boundary?.fabricated_observations === 'deny') ||
    (fabrication.tool_result === true && policy.epistemic_boundary?.fabricated_tool_results === 'deny')
  ) {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_FABRICATION_DENIED', effective);
  }

  if (PROHIBITED_ACQUISITION.has(action.acquisition_kind)) {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_ACQUISITION_DENIED', effective);
  }

  if (action.external_transfer === true && context.external_transfer_authorized !== true) {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_EXTERNAL_TRANSFER_DENIED', effective);
  }

  if (action.uses_secrets === true && context.secrets_authorized !== true) {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_SECRET_USE_DENIED', effective);
  }

  if (action.cross_user_data === true && policy.data_boundary?.cross_user_data === 'deny') {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_CROSS_USER_DATA_DENIED', effective);
  }

  if (
    action.cross_task_private_context === true &&
    policy.data_boundary?.cross_task_private_context === 'deny-unless-explicitly-authorized' &&
    context.cross_task_private_context_authorized !== true
  ) {
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_CROSS_TASK_CONTEXT_DENIED', effective);
  }

  const boundedAction = action.kind === 'retry' || action.kind === 'tool-call';
  if (boundedAction && policy.budget?.bounded_attempts === true) {
    const attempts = context.attempts;
    if (!isObject(attempts) || !Number.isInteger(attempts.used) || !Number.isInteger(attempts.limit) || attempts.limit < 1 || attempts.used < 0) {
      return decisionRecord(policy, input, DECISION.STOP, 'STOP_BUDGET_LIMIT_MISSING', effective);
    }
    if (attempts.used >= attempts.limit) {
      return decisionRecord(policy, input, DECISION.STOP, 'STOP_BUDGET_EXHAUSTED', effective);
    }
  }

  if (action.kind === 'spawn-child') {
    const parentPermissions = parent?.effective_permissions;
    const childPermissions = action.child_permissions;
    if (!stringArray(parentPermissions) || !stringArray(childPermissions)) return invalid(policy, input);
    if (policy.composition?.child_may_widen_parent === false && !subset(unique(childPermissions), unique(parentPermissions))) {
      return decisionRecord(policy, input, DECISION.STOP, 'STOP_CHILD_WIDENS_PARENT', effective);
    }
  }

  if (action.tool && context.tool_available === false) {
    if (action.can_degrade !== false) {
      return decisionRecord(policy, input, DECISION.DEGRADE, 'DEGRADE_TOOL_UNAVAILABLE', effective);
    }
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_TOOL_UNAVAILABLE', effective);
  }

  if (evidence.state === 'conflict') {
    return decisionRecord(policy, input, DECISION.DEGRADE, 'DEGRADE_SOURCE_CONFLICT', effective);
  }

  if (action.factual_claim === true && evidence.supported !== true) {
    if (action.can_degrade !== false) {
      return decisionRecord(policy, input, DECISION.DEGRADE, 'DEGRADE_MISSING_EVIDENCE', effective);
    }
    return decisionRecord(policy, input, DECISION.STOP, 'STOP_EVIDENCE_EXHAUSTED', effective);
  }

  if (action.destructive === true) {
    if (
      policy.capability_boundary?.destructive_action !== 'explicit-policy-and-confirmation' ||
      context.destructive_policy_authorized !== true
    ) {
      return decisionRecord(policy, input, DECISION.STOP, 'STOP_DESTRUCTIVE_NOT_AUTHORIZED', effective);
    }
    if (context.confirmation_state !== 'granted') {
      return decisionRecord(policy, input, DECISION.CONFIRM, 'CONFIRM_DESTRUCTIVE_ACTION', effective);
    }
  }

  if (action.requires_confirmation === true && context.confirmation_state !== 'granted') {
    return decisionRecord(policy, input, DECISION.CONFIRM, 'CONFIRM_REQUIRED', effective);
  }

  return decisionRecord(policy, input, DECISION.ALLOW, 'ALLOW_AUTHORIZED', effective);
}

async function readStdin() {
  let data = '';
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

async function cli() {
  const scriptRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const inputArg = process.argv.indexOf('--input');
  let raw;
  if (inputArg >= 0) {
    const file = process.argv[inputArg + 1];
    if (!file) throw new Error('--input requires a file path');
    raw = await readFile(path.resolve(file), 'utf8');
  } else {
    raw = await readStdin();
  }

  if (!raw.trim()) throw new Error('Container Guardian requires a JSON input payload.');
  const input = JSON.parse(raw);

  if (!input.policy && !input.container) {
    input.policy = JSON.parse(await readFile(path.join(scriptRoot, 'trust/containers/default.json'), 'utf8'));
  }

  process.stdout.write(JSON.stringify(evaluateContainerAction(input), null, 2) + '\n');
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  cli().catch((error) => {
    console.error(`Container Guardian error: ${error.message}`);
    process.exit(2);
  });
}
