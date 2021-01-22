import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/userscript.js",
    format: "iife",
  },
  plugins: [typescript()],
};
