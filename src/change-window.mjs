import { buildNotificationPlan } from './notifications.mjs';
import { buildRetrySchedule, buildRolloutPlan } from './rollout.mjs';

export function buildChangeWindow({
  services = [],
  policy = {},
  notifications = {},
  owner = 'unassigned',
} = {}) {
  const rollout = buildRolloutPlan(services, policy);

  return {
    owner,
    state: rollout.selected.length === 0 ? 'paused' : 'ready',
    rollout,
    retries: buildRetrySchedule(policy),
    notifications: buildNotificationPlan(notifications),
  };
}
