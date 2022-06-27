"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
module.exports = indexOfNewline;
function indexOfNewline(string) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, includeLength = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (offset < 0) throw new Error("Unexpected negative offset");
    if (offset > string.length) throw new Error("Offset is longer than the string. Offset: ".concat(offset, ". String: ").concat(string.length));
    while(offset < string.length){
        var value = string[offset];
        if (value === "\n") return includeLength ? [
            offset,
            1
        ] : offset;
        else if (value === "\r") {
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
