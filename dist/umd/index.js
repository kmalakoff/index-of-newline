!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).indexOfNewline=n()}(this,(function(){"use strict";return function(e,n=0,t=!1){if(n<0)throw new Error("Unexpected negative offset");if(n>e.length)throw new Error(`Offset is longer than the string. Offset: ${n}. String: ${e.length}`);for(;n<e.length;){const f=e[n];if("\n"===f)return t?[n,1]:n;if("\r"===f)return t?[n,"\n"===e[n+1]?2:1]:n;n++}return t?[-1,0]:-1}}));
//# sourceMappingURL=index.js.map
