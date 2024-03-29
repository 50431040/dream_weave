import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import { terser } from 'rollup-plugin-terser';

export default {
  input: "src/index.ts",
  output: {
    file: "dist/dream_weave.js",
    format: "iife",
    name: "DreamWeave",
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
    json(),
    terser(),
  ],
};
