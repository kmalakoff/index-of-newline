!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e||self).indexOfNewline=n()}(this,function(){return function(e,n,t){if(void 0===n&&(n=0),void 0===t&&(t=!1),n<0)throw new Error("Unexpected negative offset");if(n>e.length)throw new Error("Offset is longer than the string. Offset: "+n+". String: "+e.length);for(;n<e.length;){var f=e[n];if("\n"===f)return t?[n,1]:n;if("\r"===f)return t?[n,"\n"===e[n+1]?2:1]:n;n++}return t?[-1,0]:-1}});
//# sourceMappingURL=index.umd.cjs.map
