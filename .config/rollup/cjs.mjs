import path from "path";
import { __dirname, presetEnv, config } from "./base.mjs";

export default config({
  output: [
    {
      file: path.resolve(__dirname, "..", "..", "dist", "cjs", "index.js"),
      format: "cjs",
      sourcemap: true,
      exports: "auto",
    },
  ],
  presets: [presetEnv({ node: "6" }, false)],
});
