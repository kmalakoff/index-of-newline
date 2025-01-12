const assert = require('assert');
const indexOfNewline = require('index-of-newline/dist/umd/index-of-newline.cjs');

describe('exports index-of-newline/dist/umd/index-of-newline.cjs', () => {
  it('first newline', () => {
    const index = indexOfNewline('some\r\nstring\ncombination\r');
    assert.equal(index, 4);
  });
});
