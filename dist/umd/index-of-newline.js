(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.indexOfNewline = factory());
})(this, (function () { 'use strict';

  /**
   * Find indexOf CR, LF, or CRLF
   *
   * @param string The search string
   * @param offset The offset for searching
   * @param includeLength Include the length in the return value
   * @returns When includeLength is true, returns a pair of [offset, length] to provide the length of CR (1), LF (1) or CRLF (2)
   */ function indexOfNewline(string) {
      var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, includeLength = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (offset < 0) throw new Error("Unexpected negative offset");
      if (offset > string.length) throw new Error("Offset is longer than the string. Offset: ".concat(offset, ". String: ").concat(string.length));
      while(offset < string.length){
          var value = string[offset];
          if (value === "\n") return includeLength ? [
              offset,
              1
          ] : offset;
          if (value === "\r") {
              return includeLength ? [
                  offset,
                  string[offset + 1] === "\n" ? 2 : 1
              ] : offset;
          }
          offset++;
      }
      return includeLength ? [
          -1,
          0
      ] : -1;
  }

  return indexOfNewline;

}));
//# sourceMappingURL=index-of-newline.js.map
