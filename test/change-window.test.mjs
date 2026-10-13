import assert from 'node:assert/strict';
import test from 'node:test';
import { buildChangeWindow } from '../src/change-window.mjs';

test('combines rollout, retry, and notification decisions', () => {
  const window = buildChangeWindow({
    services: ['accounts', 'billing', 'checkout', 'notifications'],
    policy: {
      rolloutPercent: 50,
      batchSize: 3,
      maxRetries: 2,
      retryDelaySeconds: 10,
    },
    notifications: {
      channel: '#release-ops',
      reminderMinutes: 30,
    },
    owner: 'release-engineering',
  });

  assert.equal(window.state, 'ready');
  assert.equal(window.owner, 'release-engineering');
  assert.deepEqual(window.rollout.selected, ['accounts', 'billing']);
  assert.deepEqual(window.retries, [10, 20]);
  assert.deepEqual(window.notifications, {
    channel: '#release-ops',
    reminderMinutes: 30,
  });
});

test('uses operational defaults for an incomplete request', () => {
  const window = buildChangeWindow({ services: ['accounts'] });

  assert.equal(window.owner, 'unassigned');
  assert.deepEqual(window.rollout.selected, ['accounts']);
  assert.deepEqual(window.retries, [30, 60, 120]);
  assert.deepEqual(window.notifications, {
    channel: '#operations',
    reminderMinutes: 15,
  });
});
