import assert from 'node:assert/strict';
import test from 'node:test';
import { summarizeBlastRadius } from '../src/impact.mjs';

test('summarizes affected tiers, teams, and regions deterministically', () => {
  assert.deepEqual(summarizeBlastRadius([
    { name: 'checkout-api', tier: 0, team: 'commerce', region: 'global' },
    { name: 'payment-authorizer', tier: 0, team: 'payments', region: 'global' },
    { name: 'billing-ledger', tier: 1, team: 'payments', region: 'us-east' },
  ]), {
    selectedServices: 3,
    tierZeroServices: ['checkout-api', 'payment-authorizer'],
    teams: ['commerce', 'payments'],
    regions: ['global', 'us-east'],
  });
});

test('reports an empty blast radius', () => {
  assert.deepEqual(summarizeBlastRadius([]), {
    selectedServices: 0,
    tierZeroServices: [],
    teams: [],
    regions: [],
  });
});
