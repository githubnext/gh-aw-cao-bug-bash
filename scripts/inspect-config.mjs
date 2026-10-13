import { readFile } from 'node:fs/promises';
import { normalizePolicy } from '../src/policy.mjs';

const configPath = process.argv[2];
if (!configPath) throw new Error('Usage: node scripts/inspect-config.mjs <config.json>');

const teams = JSON.parse(await readFile(configPath, 'utf8'));
for (const [team, policy] of Object.entries(teams)) {
  process.stdout.write(`${team}: ${JSON.stringify(normalizePolicy(policy))}\n`);
}
