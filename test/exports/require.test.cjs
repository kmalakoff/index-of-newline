const assert = require('assert');
const indexOfNewline = require('index-of-newline');

describe('exports .cjs', () => {
  it('first newline', () => {
    const index = indexOfNewline('some\r\nstring\ncombination\r');
    assert.equal(index, 4);
  });
});
