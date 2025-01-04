## index-of-newline

Find next line ending in CR, LF or CRLF

### Example 1

```typescript
import indexOfNewline from "index-of-newline";

const string = "some\r\nstring\ncombination\r";
let index = indexOfNewline(string) as number;
console.log(index); // 4

index = indexOfNewline(string, index + 2) as number;
console.log(index); // 12

index = indexOfNewline(string, index + 1) as number;
console.log(index); // 24
```

### Example 2

```typescript
import indexOfNewline from "index-of-newline";

const string = "some\r\nstring\ncombination\r";
const results = [];
let [index, length] = indexOfNewline(string, 0, true) as number[];
while (index >= 0) {
  results.push(index);
  [index, length] = indexOfNewline(string, index + length, true) as number[];
}
console.log(results); // [4, 12, 24]
```

### Documentation

[API Docs](https://kmalakoff.github.io/index-of-newline/)
