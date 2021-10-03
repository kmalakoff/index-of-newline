import path from "path";
import { __dirname, presetEnv, config } from "./base.mjs";

export default config({
  output: [
    {
      file: path.resolve(__dirname, "..", "..", "dist", "esm", "index.js"),
      format: "esm",
      sourcemap: true,
    },
  ],
  presets: [presetEnv({ node: "current" }, "auto")],
});
