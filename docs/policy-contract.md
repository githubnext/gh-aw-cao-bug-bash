# Rollout policy contract

This document is the public contract for policy normalization and change-window
planning. Historical notes and example files are not authoritative when they
disagree with this document.

## Numeric settings

Policy values may be numbers or numeric strings. Non-finite values and values
outside the supported range use or clamp to the field definition as described
below.

| Setting | Range | Default | Boundary behavior |
| --- | --- | --- | --- |
| `rolloutPercent` | 0-100 | 100 | `0` pauses deployment and selects no services |
| `maxRetries` | 0-10 | 3 | `0` disables retries and produces an empty schedule |
| `retryDelaySeconds` | 0-3600 | 30 | `0` requests immediate retries |
| `batchSize` | 1-100 | 10 | `0` is invalid and uses the default |
| `reminderMinutes` | 0-1440 | 15 | `0` disables the pre-window reminder |

Omission and explicit zero are different whenever a setting's range includes
zero. Callers use explicit zero during incident response to pause a rollout,
disable retries, or remove a delay without changing the stored policy shape.

## Planning

`buildRolloutPlan` selects the requested percentage of services in inventory
order, capped by `batchSize`. It returns selected and deferred services without
mutating the inventory.

`buildRetrySchedule` returns one delay per retry. Delay doubles after each
attempt. No retry entries are returned when `maxRetries` is zero.

`buildChangeWindow` combines rollout, retry, and notification planning. Its
result must preserve the normalized policy used for each decision.
