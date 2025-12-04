import assert from 'assert';
import indexOfNewline from 'index-of-newline';

const ANSI_1 = '\u001B[4mUnicorn\u001B[0m';
const ANSI_2 = '\u001B[2A\u001B[1000D\u001B[4mUnicorn\u001B[0m';

// Unicode test strings
const EMOJI_SIMPLE = '😀'; // 4-byte UTF-8, 2 UTF-16 code units (surrogate pair)
const EMOJI_FAMILY = '👨‍👩‍👧‍👦'; // Multi-codepoint emoji with ZWJ
const CJK = '中文'; // 3-byte UTF-8 each
const COMBINING = 'café'; // 'e' + combining acute accent (U+0301)

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

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 12);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 24);
    });

    it('all values LFCR - ansi', () => {
      const string = `${ANSI_1}\n\r${ANSI_1}\n${ANSI_1}\r`;

      let index = indexOfNewline(string) as number;
      assert.equal(index, ANSI_1.length);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, ANSI_1.length + 1);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 2 * ANSI_1.length + 1 + 1);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 3 * ANSI_1.length + 1 + 1 + 1);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, -1);
    });

    it('none', () => {
      const index = indexOfNewline('somestringcombination');
      assert.equal(index, -1);
    });

    it('none - ansi', () => {
      const index = indexOfNewline('\u001B[4mUnicorn\u001B[0m');
      assert.equal(index, -1);
    });

    it('none offset', () => {
      const index = indexOfNewline('somestringcombination', 10);
      assert.equal(index, -1);
    });

    it('none offset - ansi', () => {
      const index = indexOfNewline('\u001B[4mUnicorn\u001B[0m', 10);
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

    it('all values CRLF - ansi', () => {
      const string = `${ANSI_1}\r\n${ANSI_1}\n${ANSI_1}\r`;

      let [index, length] = indexOfNewline(string, 0, true) as number[];
      assert.equal(index, ANSI_1.length);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 2 * ANSI_1.length + 2);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 3 * ANSI_1.length + 2 + 1);
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

    it('all values LFCR - ansi', () => {
      const string = `${ANSI_2}\n\r${ANSI_2}\n${ANSI_2}\r`;
      let [index, length] = indexOfNewline(string, 0, true) as number[];
      assert.equal(index, ANSI_2.length);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, ANSI_2.length + 1);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 2 * ANSI_2.length + 1 + 1);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, 3 * ANSI_2.length + 1 + 1 + 1);

      [index, length] = indexOfNewline(string, index + length, true) as number[];
      assert.equal(index, -1);
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

    it('iterate - ansi', () => {
      const string = `${ANSI_2}\r\n${ANSI_2}\n${ANSI_2}\rwith\rnend`;

      const results = [];
      let [index, length] = indexOfNewline(string, 0, true) as number[];
      while (index >= 0) {
        results.push(index);
        [index, length] = indexOfNewline(string, index + length, true) as number[];
      }
      assert.deepEqual(results, [ANSI_2.length, 2 * ANSI_2.length + 2, 3 * ANSI_2.length + 2 + 1, 3 * ANSI_2.length + 2 + 1 + 5]);
    });
  });

  describe('unicode', () => {
    it('finds newline after simple emoji', () => {
      const string = `Hello${EMOJI_SIMPLE}\nWorld`;
      const index = indexOfNewline(string) as number;
      // Emoji is 2 UTF-16 code units, so index should be 5 + 2 = 7
      assert.equal(index, 5 + EMOJI_SIMPLE.length);
      // Verify the index is usable for slicing
      assert.equal(string.slice(0, index), `Hello${EMOJI_SIMPLE}`);
      assert.equal(string.slice(index + 1), 'World');
    });

    it('finds newline after family emoji', () => {
      const string = `${EMOJI_FAMILY}\ntext`;
      const index = indexOfNewline(string) as number;
      assert.equal(index, EMOJI_FAMILY.length);
      assert.equal(string.slice(0, index), EMOJI_FAMILY);
      assert.equal(string.slice(index + 1), 'text');
    });

    it('finds newline after CJK characters', () => {
      const string = `Hello${CJK}\nWorld`;
      const index = indexOfNewline(string) as number;
      assert.equal(index, 5 + CJK.length);
      assert.equal(string.slice(0, index), `Hello${CJK}`);
      assert.equal(string.slice(index + 1), 'World');
    });

    it('finds newline after combining characters', () => {
      const string = `${COMBINING}\nmore`;
      const index = indexOfNewline(string) as number;
      assert.equal(index, COMBINING.length);
      assert.equal(string.slice(0, index), COMBINING);
      assert.equal(string.slice(index + 1), 'more');
    });

    it('iterates through emoji-containing string with includeLength', () => {
      const string = `${EMOJI_SIMPLE}\r\n${CJK}\n${EMOJI_FAMILY}\r`;
      const results = [];
      let [index, length] = indexOfNewline(string, 0, true) as number[];
      while (index >= 0) {
        results.push([index, length]);
        [index, length] = indexOfNewline(string, index + length, true) as number[];
      }
      assert.deepEqual(results, [
        [EMOJI_SIMPLE.length, 2], // CRLF after emoji
        [EMOJI_SIMPLE.length + 2 + CJK.length, 1], // LF after CJK
        [EMOJI_SIMPLE.length + 2 + CJK.length + 1 + EMOJI_FAMILY.length, 1], // CR after family emoji
      ]);
    });

    it('finds newline in mixed unicode and ANSI', () => {
      const string = `${ANSI_1}${EMOJI_SIMPLE}${CJK}\nrest`;
      const index = indexOfNewline(string) as number;
      const expected = ANSI_1.length + EMOJI_SIMPLE.length + CJK.length;
      assert.equal(index, expected);
      assert.equal(string.slice(0, index), `${ANSI_1}${EMOJI_SIMPLE}${CJK}`);
    });

    it('no newline in unicode string', () => {
      const string = `${EMOJI_FAMILY}${CJK}${ANSI_1}`;
      const index = indexOfNewline(string) as number;
      assert.equal(index, -1);
    });

    it('handles offset within unicode string', () => {
      const string = `abc${EMOJI_SIMPLE}\nxyz${EMOJI_SIMPLE}\nend`;
      // Start search after first newline
      const first = indexOfNewline(string) as number;
      assert.equal(first, 3 + EMOJI_SIMPLE.length);

      const second = indexOfNewline(string, first + 1) as number;
      assert.equal(second, first + 1 + 3 + EMOJI_SIMPLE.length);
      assert.equal(string.slice(first + 1, second), `xyz${EMOJI_SIMPLE}`);
    });
  });
});
