'use strict';

function normalizeLegacyBatchOptions(input) {
  const batchSize = Number(input && input.batchSize) || 10;
  return {
    batchSize: Math.min(100, Math.max(1, batchSize)),
    label: String((input && input.label) || 'legacy-batch'),
  };
}

module.exports = { normalizeLegacyBatchOptions };
