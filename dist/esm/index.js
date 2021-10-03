function t(t,e=0,r=!1){if(e<0)throw new Error("Unexpected negative offset");if(e>t.length)throw new Error(`Offset is longer than the string. Offset: ${e}. String: ${t.length}`);for(;e<t.length;){const n=t[e];if("\n"===n)return r?[e,1]:e;if("\r"===n)return r?[e,"\n"===t[e+1]?2:1]:e;e++}return r?[-1,0]:-1}export{t as default};
//# sourceMappingURL=index.js.map
