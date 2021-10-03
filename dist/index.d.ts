/**
 * Find indexOf CR, LF, or CRLF
 *
 * @param string The search string
 * @param offset The offset for searching
 * @param includeLength Include the length in the return value
 * @returns when true, returns a pair of [offset, length] to provide the length of CR (1), LF (1) or CRLF (2)
 */
export default function indexOfNewline(string: string, offset?: number, includeLength?: boolean): number | number[];
