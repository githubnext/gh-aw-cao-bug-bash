import { readFile } from 'node:fs/promises';
import { buildChangeWindow } from './change-window.mjs';
import { summarizeBlastRadius } from './impact.mjs';

const inputPath = process.argv[2];
if (!inputPath) {
  throw new Error('Usage: node src/demo.mjs <scenario.json>');
}

const scenario = JSON.parse(await readFile(inputPath, 'utf8'));
const services = scenario.inventory
  ? JSON.parse(await readFile(scenario.inventory, 'utf8'))
  : scenario.services;
const changeWindow = buildChangeWindow({ ...scenario, services });
const impact = summarizeBlastRadius(changeWindow.rollout.selected);

process.stdout.write(`${JSON.stringify({ changeWindow, impact }, null, 2)}\n`);
