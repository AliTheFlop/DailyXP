const test = require('node:test');
const assert = require('node:assert/strict');
const { xpForLevel, calculateLevel, xpToNextLevel } = require('../build/xp-system.js');

test('xpForLevel thresholds', () => {
  assert.strictEqual(xpForLevel(1), 0);
  assert.strictEqual(xpForLevel(9), 312);
  assert.strictEqual(xpForLevel(10), 362);
  assert.strictEqual(xpForLevel(50), 5362);
});

test('calculateLevel boundaries', () => {
  assert.strictEqual(calculateLevel(0), 1);
  assert.strictEqual(calculateLevel(xpForLevel(9)), 9);
  assert.strictEqual(calculateLevel(xpForLevel(10) - 1), 9);
  assert.strictEqual(calculateLevel(xpForLevel(10)), 10);
  assert.strictEqual(calculateLevel(xpForLevel(50)), 50);
});

test('xpToNextLevel at boundaries', () => {
  assert.strictEqual(xpToNextLevel(xpForLevel(1)), xpForLevel(2) - xpForLevel(1));
  assert.strictEqual(xpToNextLevel(xpForLevel(9)), xpForLevel(10) - xpForLevel(9));
  assert.strictEqual(xpToNextLevel(xpForLevel(10)), xpForLevel(11) - xpForLevel(10));
});
