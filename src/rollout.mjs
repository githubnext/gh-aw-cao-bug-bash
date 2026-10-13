import { normalizePolicy } from './policy.mjs';

export function buildRolloutPlan(services, inputPolicy = {}) {
  const policy = normalizePolicy(inputPolicy);
  const requestedCount = Math.ceil(services.length * (policy.rolloutPercent / 100));
  const selectedCount = Math.min(requestedCount, policy.batchSize);

  return {
    policy,
    selected: services.slice(0, selectedCount),
    deferred: services.slice(selectedCount),
  };
}

export function buildRetrySchedule(inputPolicy = {}) {
  const policy = normalizePolicy(inputPolicy);
  return Array.from(
    { length: policy.maxRetries },
    (_, attempt) => policy.retryDelaySeconds * (2 ** attempt),
  );
}
