import typescript from "@rollup/plugin-typescript";
import replace from "rollup-plugin-re";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.ts",
    format: "esm",
  },
  plugins: [
    typescript(),
    replace({
      patterns: [
        {
          transform(code) {
            return `const code = \`${code}\`;export default code;`;
          },
        },
      ],
    }),
  ],
};
