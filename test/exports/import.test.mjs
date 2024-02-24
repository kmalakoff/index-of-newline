import assert from 'assert';
import indexOfNewline from 'index-of-newline';

describe('exports .mjs', () => {
  it('first newline', () => {
    const index = indexOfNewline('some\r\nstring\ncombination\r');
    assert.equal(index, 4);
  });
});
