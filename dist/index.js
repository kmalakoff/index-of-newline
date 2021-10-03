function r(r,e,t){if(void 0===e&&(e=0),void 0===t&&(t=!1),e<0)throw new Error("Unexpected negative offset");if(e>r.length)throw new Error("Offset is longer than the string. Offset: "+e+". String: "+r.length);for(;e<r.length;){var n=r[e];if("\n"===n)return t?[e,1]:e;if("\r"===n)return t?[e,"\n"===r[e+1]?2:1]:e;e++}return t?[-1,0]:-1}export{r as default};
//# sourceMappingURL=index.js.map
