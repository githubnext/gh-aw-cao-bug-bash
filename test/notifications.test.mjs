import assert from 'node:assert/strict';
import test from 'node:test';
import { buildNotificationPlan } from '../src/notifications.mjs';

test('accepts an explicit zero-minute reminder', () => {
  assert.equal(buildNotificationPlan({ reminderMinutes: 0 }).reminderMinutes, 0);
});

test('normalizes the channel and clamps the reminder window', () => {
  assert.deepEqual(buildNotificationPlan({
    channel: '#deployments',
    reminderMinutes: 2000,
  }), {
    channel: '#deployments',
    reminderMinutes: 1440,
  });
});
