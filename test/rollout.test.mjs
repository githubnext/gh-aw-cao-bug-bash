import assert from 'node:assert/strict';
import test from 'node:test';
import { buildRetrySchedule, buildRolloutPlan } from '../src/rollout.mjs';

const services = ['accounts', 'billing', 'checkout', 'notifications'];

test('selects a bounded percentage of services', () => {
  const plan = buildRolloutPlan(services, { rolloutPercent: 50, batchSize: 10 });
  assert.deepEqual(plan.selected, ['accounts', 'billing']);
  assert.deepEqual(plan.deferred, ['checkout', 'notifications']);
});

test('caps the rollout at the configured batch size', () => {
  const plan = buildRolloutPlan(services, { rolloutPercent: 100, batchSize: 2 });
  assert.deepEqual(plan.selected, ['accounts', 'billing']);
});

test('builds an exponential retry schedule', () => {
  assert.deepEqual(
    buildRetrySchedule({ maxRetries: 3, retryDelaySeconds: 5 }),
    [5, 10, 20],
  );
});
