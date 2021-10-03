import { assert } from "chai";
import indexOfNewline from "index-of-newline";

describe("index-of-newline", function () {
  describe("no length", function () {
    it("all values", function () {
      const string = "some\r\nstring\ncombination\r";

      let index = indexOfNewline(string) as number;
      assert.equal(index, 4);

      index = indexOfNewline(string, index + 2) as number;
      assert.equal(index, 12);

      index = indexOfNewline(string, index + 1) as number;
      assert.equal(index, 24);
    });

    it("none", function () {
      const index = indexOfNewline("somestringcombination");
      assert.equal(index, -1);
    });

    it("none offset", function () {
      const index = indexOfNewline("somestringcombination", 10);
      assert.equal(index, -1);
    });

    it("invalid negative offset", function () {
      assert.throws(() => indexOfNewline("some\r\nstring\ncombination\r", -1));
    });

    it("invalid positive offset", function () {
      assert.throws(() =>
        indexOfNewline(
          "some\r\nstring\ncombination\r",
          "some\r\nstring\ncombination\r".length + 1
        )
      );
    });
  });

  describe("includeLength", function () {
    it("all values", function () {
      const string = "some\r\nstring\ncombination\r";

      let [index, length] = indexOfNewline(string, 0, true) as number[];
      assert.equal(index, 4);

      [index, length] = indexOfNewline(
        string,
        index + length,
        true
      ) as number[];
      assert.equal(index, 12);

      [index, length] = indexOfNewline(
        string,
        index + length,
        true
      ) as number[];
      assert.equal(index, 24);
    });

    it("none", function () {
      const string = "somestringcombination";
      const [index, length] = indexOfNewline(string, 0, true) as number[];
      assert.equal(index, -1);
      assert.equal(length, 0);
    });

    it("none offset", function () {
      const string = "somestringcombination";
      const [index, length] = indexOfNewline(string, 10, true) as number[];
      assert.equal(index, -1);
      assert.equal(length, 0);
    });

    it("iterate", function () {
      const string = "some\r\nstring\ncombination\r";

      const results = [];
      let [index, length] = indexOfNewline(string, 0, true) as number[];
      while (index >= 0) {
        results.push(index);
        [index, length] = indexOfNewline(
          string,
          index + length,
          true
        ) as number[];
      }
      assert.deepEqual(results, [4, 12, 24]);
    });
  });
});
