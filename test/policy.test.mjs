import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizePolicy } from '../src/policy.mjs';

test('uses documented defaults when policy fields are omitted', () => {
  assert.deepEqual(normalizePolicy(), {
    rolloutPercent: 100,
    maxRetries: 3,
    retryDelaySeconds: 30,
    batchSize: 10,
  });
});

test('accepts numeric strings and clamps values to documented limits', () => {
  assert.deepEqual(normalizePolicy({
    rolloutPercent: '25',
    maxRetries: 20,
    retryDelaySeconds: '15',
    batchSize: 200,
  }), {
    rolloutPercent: 25,
    maxRetries: 10,
    retryDelaySeconds: 15,
    batchSize: 100,
  });
});

test('uses the default for a non-finite value', () => {
  assert.equal(normalizePolicy({ rolloutPercent: 'not-a-number' }).rolloutPercent, 100);
});
