import fs from "fs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.ts",
    format: "iife",
  },
  plugins: [
    typescript(),
    {
      name: "rollup-plugin-export-code-as-string",
      writeBundle(options) {
        const outputJS = fs.readFileSync(options.file, { encoding: "utf8" });
        const escapedJS = JSON.stringify(outputJS);
        const outputTS = `const code = ${escapedJS};export default code;`;
        fs.writeFileSync(options.file, outputTS);
      },
    },
  ],
};
