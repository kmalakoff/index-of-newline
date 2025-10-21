import assert from 'assert';
import indexOfNewline from 'index-of-newline';

describe('exports .ts', () => {
  it('first newline', () => {
    const index = indexOfNewline('some\r\nstring\ncombination\r');
    assert.equal(index, 4);
  });
});
