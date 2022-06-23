/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require("assert");
const indexOfNewline = require("index-of-newline");

describe("exports .cjs", function () {
  it("first newline", function () {
    const index = indexOfNewline("some\r\nstring\ncombination\r");
    assert.equal(index, 4);
  });
});
