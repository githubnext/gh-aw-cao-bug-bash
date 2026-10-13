'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { normalizeLegacyBatchOptions } = require('../legacy/batch-options.cjs');

test('uses a positive legacy batch size', () => {
  assert.deepEqual(normalizeLegacyBatchOptions({ batchSize: 4, label: 'old-worker' }), {
    batchSize: 4,
    label: 'old-worker',
  });
});

test('rejects zero because legacy batches cannot be empty', () => {
  assert.equal(normalizeLegacyBatchOptions({ batchSize: 0 }).batchSize, 10);
});
