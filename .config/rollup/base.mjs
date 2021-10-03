import path from "path";
import { fileURLToPath } from "url";
import externals from "rollup-plugin-node-externals";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export function presetEnv(targets, modules) {
  return ["@babel/preset-env", { targets, modules }];
}
export function config({ output, presets }) {
  return {
    input: path.resolve(__dirname, "..", "..", "src", "index.ts"),
    output,
    plugins: [
      externals({ deps: true }),
      resolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        extensions: [".ts", ".tsx"],
        presets: ["@babel/preset-typescript", ...presets],
      }),
      terser(),
    ],
  };
}
