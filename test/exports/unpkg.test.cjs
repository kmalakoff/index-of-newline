/* eslint-disable @typescript-eslint/no-var-requires */
const { assert } = require("chai");
const indexOfNewline = require("index-of-newline/dist/index.umd.cjs");

describe("exports index-of-newline/dist/index.umd.cjs", function () {
  it("first newline", function () {
    const index = indexOfNewline("some\r\nstring\ncombination\r");
    assert.equal(index, 4);
  });
});
