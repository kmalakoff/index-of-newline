/**
 * Find indexOf CR, LF, or CRLF
 *
 * @param string The search string
 * @param offset The offset for searching
 * @param includeLength Include the length in the return value
 * @returns When includeLength is true, returns a pair of [offset, length] to provide the length of CR (1), LF (1) or CRLF (2)
 */ export default function indexOfNewline(string, offset = 0, includeLength = false) {
    if (offset < 0) throw new Error('Unexpected negative offset');
    if (offset > string.length) throw new Error(`Offset is longer than the string. Offset: ${offset}. String: ${string.length}`);
    while(offset < string.length){
        const value = string[offset];
        if (value === '\n') return includeLength ? [
            offset,
            1
        ] : offset;
        if (value === '\r') {
            return includeLength ? [
                offset,
                string[offset + 1] === '\n' ? 2 : 1
            ] : offset;
        }
        offset++;
    }
    return includeLength ? [
        -1,
        0
    ] : -1;
};
