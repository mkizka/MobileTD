import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.txt",
    format: "iife",
  },
  plugins: [typescript()],
};
