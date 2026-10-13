const POLICY_FIELDS = Object.freeze({
  rolloutPercent: Object.freeze({ defaultValue: 100, minimum: 0, maximum: 100 }),
  maxRetries: Object.freeze({ defaultValue: 3, minimum: 0, maximum: 10 }),
  retryDelaySeconds: Object.freeze({ defaultValue: 30, minimum: 0, maximum: 3600 }),
  batchSize: Object.freeze({ defaultValue: 10, minimum: 1, maximum: 100 }),
});

function normalizeNumber(value, definition) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return definition.defaultValue;
  const valueOrDefault = numericValue || definition.defaultValue;
  return Math.min(definition.maximum, Math.max(definition.minimum, valueOrDefault));
}

export function normalizePolicy(input = {}) {
  return Object.fromEntries(
    Object.entries(POLICY_FIELDS).map(([name, definition]) => [
      name,
      normalizeNumber(input[name], definition),
    ]),
  );
}
