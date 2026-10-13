# Change Window Coordinator

This repository contains a small change-window coordinator used to turn service
inventory, team overrides, and operator policy into rollout, retry, and
notification plans.

The codebase has evolved through several generations. Current ESM modules sit
beside a legacy CommonJS adapter, configuration is checked in by multiple teams,
and field rules are split between the public contract and implementation
metadata.

## Contract

The authoritative contract is in
[`docs/policy-contract.md`](docs/policy-contract.md). In brief,
`normalizePolicy` accepts numbers or numeric strings.

| Setting | Valid range | Omitted or invalid value | Meaning of `0` |
| --- | --- | --- | --- |
| `rolloutPercent` | 0-100 | 100 | Pause all rollout work |
| `maxRetries` | 0-10 | 3 | Disable retries |
| `retryDelaySeconds` | 0-3600 | 30 | Retry immediately |
| `batchSize` | 1-100 | 10 | Invalid; use the default |

## Run it

```bash
npm test
npm run demo
npm run inspect:config
```

`npm run demo` evaluates the checked-in paused-rollout scenario against the
production-like service inventory and prints the resulting plan and
blast-radius summary.

## Repository map

| Path | Role |
| --- | --- |
| `src/policy.mjs` | Shared numeric policy normalization |
| `src/rollout.mjs` | Rollout selection and retry schedule |
| `src/change-window.mjs` | Higher-level orchestration used by the demo |
| `src/notifications.mjs` | Notification defaults with different zero/empty semantics |
| `src/impact.mjs` | Blast-radius summary for selected services |
| `legacy/batch-options.cjs` | Older CommonJS compatibility adapter |
| `config/production-fleet.json` | Tiered service inventory used by the demo |
| `config/team-overrides.json` | Long-lived team-specific configuration |
| `examples/` | Executable operator scenarios |
| `docs/` | Public behavioral contract and operational notes |
