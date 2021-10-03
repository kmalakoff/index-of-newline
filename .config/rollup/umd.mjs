import path from "path";
import fs from "fs";
import camelcase from "camelcase";
import { __dirname, presetEnv, config } from "./base.mjs";

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8"));

export default config({
  output: [
    {
      file: path.resolve(__dirname, "..", "..", "dist", "umd", "index.js"),
      format: "umd",
      sourcemap: true,
      name: camelcase(pkg.name),
    },
  ],
  presets: [presetEnv({ node: "6" }, false)],
});
