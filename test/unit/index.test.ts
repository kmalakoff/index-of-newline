import assert from 'assert';
// @ts-ignore
import indexOfNewline from 'index-of-newline';

describe('index-of-newline', () => {
  describe('no length', () => {
    it('all values CRLF', () => {
      const string = 'some\r\nstring\ncombination\r';

      let index = indexOfNewline(string) as number;
      assert.equal(index, 4);

      index = indexOfNewline(string, index + 2) as number;
      assert.equal(index, 12);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 24);
    });

    it('all values LFCR', () => {
      const string = 'some\n\rstring\ncombination\r';

      let index = indexOfNewline(string) as number;
      assert.equal(index, 4);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 5);

      index = indexOfNewline(string, index + 2) as number;
      assert.equal(index, 12);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 24);
    });

    it('none', () => {
      const index = indexOfNewline('somestringcombination');
      assert.equal(index, -1);
    });

    it('none offset', () => {
      const index = indexOfNewline('somestringcombination', 10);
      assert.equal(index, -1);
    });

    it('invalid negative offset', () => {
      assert.throws(() => indexOfNewline('some\r\nstring\ncombination\r', -1));
    });

    it('invalid positive offset', () => {
      assert.throws(() => indexOfNewline('some\r\nstring\ncombination\r', 'some\r\nstring\ncombination\r'.length + 1));
    });
  });

  describe('includeLength', () => {
    it('all values CRLF', () => {
      const string = 'some\r\nstring\ncombination\r';

      let [index, length] = indexOfNewline(string, 0, true) as number[];
      assert.equal(index, 4);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 12);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 24);
    });

    it('all values LFCR', () => {
      const string = 'some\n\rstring\ncombination\r';

      let [index, length] = indexOfNewline(string, 0, true) as number[];
      assert.equal(index, 4);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 5);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 12);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 24);
    });

    it('none', () => {
      const string = 'somestringcombination';
      const [index, length] = indexOfNewline(string, 0, true) as number[];
      assert.equal(index, -1);
      assert.equal(length, 0);
    });

    it('none offset', () => {
      const string = 'somestringcombination';
      const [index, length] = indexOfNewline(string, 10, true) as number[];
      assert.equal(index, -1);
      assert.equal(length, 0);
    });

    it('iterate', () => {
      const string = 'some\r\nstring\ncombination\rwith\rnend';

      const results = [];
      let [index, length] = indexOfNewline(string, 0, true) as number[];
      while (index >= 0) {
        results.push(index);
        [index, length] = indexOfNewline(string, index + length, true) as number[];
      }
      assert.deepEqual(results, [4, 12, 24, 29]);
    });
  });
});
