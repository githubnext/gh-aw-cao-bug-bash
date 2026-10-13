function boundedNumber(value, fallback, minimum, maximum) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.min(maximum, Math.max(minimum, numericValue));
}

export function buildNotificationPlan(input = {}) {
  return {
    channel: String(input.channel || '#operations').trim(),
    reminderMinutes: boundedNumber(input.reminderMinutes, 15, 0, 1440),
  };
}
