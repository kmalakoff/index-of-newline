import { assert } from "chai";
import indexOfNewline from "index-of-newline";

describe("exports .mjs", function () {
  it("first newline", function () {
    const index = indexOfNewline("some\r\nstring\ncombination\r");
    assert.equal(index, 4);
  });
});
