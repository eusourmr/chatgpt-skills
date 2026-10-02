#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { evaluateContainerAction } from './container-guardian.mjs';

const OUTCOME = new Set(['native-only', 'skill', 'external-discovery', 'coverage-gap', 'clarify']);

const EXECUTION_STATE = Object.freeze({
  ALLOW: 'proceed',
  CONFIRM: 'await-confirmation',
  DEGRADE: 'bounded-result',
  STOP: 'stop'
});

export function guardNavigatorProposal(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('Navigator adapter input must be an object.');
  }
  const route = input.route;
  const guard = input.guard;
  if (!route || typeof route !== 'object' || Array.isArray(route)) {
    throw new TypeError('route is required.');
  }
  if (!OUTCOME.has(route.outcome)) {
    throw new TypeError('route.outcome is invalid.');
  }
  if (!guard || typeof guard !== 'object' || Array.isArray(guard)) {
    throw new TypeError('guard is required.');
  }

  const action = route.proposed_action ?? guard.action;
  if (!action) {
    throw new TypeError('A proposed action is required for Guardian integration.');
  }

  const guardian = evaluateContainerAction({
    ...guard,
    action
  });

  return {
    navigator: {
      outcome: route.outcome,
      selected_skill_ids: Array.isArray(route.selected_skill_ids) ? [...route.selected_skill_ids] : [],
      native_first_preserved: route.outcome === 'native-only' || route.native_sufficient !== true
    },
    guardian,
    execution: {
      state: EXECUTION_STATE[guardian.decision],
      may_auto_widen_permissions: false,
      may_auto_bypass_stop: false,
      may_auto_retry_after_stop: false,
      alternative_path_requires_new_guardian_decision: true
    },
    plain_language: guardian.reason
  };
}

async function readStdin() {
  let data = '';
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

async function cli() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const raw = await readStdin();
  if (!raw.trim()) throw new Error('Navigator Container Adapter requires a JSON input payload.');
  const input = JSON.parse(raw);

  if (!input.guard) input.guard = {};
  if (!input.guard.policy && !input.guard.container) {
    input.guard.policy = JSON.parse(await readFile(path.join(root, 'trust/containers/default.json'), 'utf8'));
  }

  process.stdout.write(JSON.stringify(guardNavigatorProposal(input), null, 2) + '\n');
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  cli().catch((error) => {
    console.error(`Navigator Container Adapter error: ${error.message}`);
    process.exit(2);
  });
}
