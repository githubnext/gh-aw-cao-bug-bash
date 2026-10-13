# Operations notes

The coordinator has no database. Team overrides are checked in under `config/`
and combined with an operator scenario at execution time.

## During an incident

Operators commonly set `rolloutPercent`, `maxRetries`, and
`retryDelaySeconds` to zero together. This is a pause-and-observe posture:

- select no services;
- schedule no retries; and
- if retries are later re-enabled, do not add a delay.

The `examples/paused-rollout.json` scenario represents that posture. Run it
with `npm run demo`.

## Compatibility

`legacy/batch-options.cjs` remains for one old caller. Its batch size has always
been positive, so zero is invalid there. Do not infer current zero semantics
from that adapter.
