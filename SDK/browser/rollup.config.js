import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/dream_weave.js",
    format: "umd",
    name: "DreamWeave",
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
    json(),
  ],
};
