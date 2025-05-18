const assert = require('assert');

let umd = null;
try {
  umd = require('index-of-newline/umd');
} catch (_) {
  umd = require('../../dist/umd/index-of-newline.cjs');
}
const indexOfNewline = typeof window !== 'undefined' ? window.indexOfNewline : umd.default || umd;

describe('exports umd', () => {
  it('first newline', () => {
    const index = indexOfNewline('some\r\nstring\ncombination\r');
    assert.equal(index, 4);
  });
});
