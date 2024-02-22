const assert = require('assert');
const indexOfNewline = require('index-of-newline/dist/umd/index-of-newline.min.js');

describe('exports index-of-newline/dist/umd/index-of-newline.min.js', () => {
  it('first newline', () => {
    const index = indexOfNewline('some\r\nstring\ncombination\r');
    assert.equal(index, 4);
  });
});
