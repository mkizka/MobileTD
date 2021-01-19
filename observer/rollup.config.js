import fs from "fs";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

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
        const outputTS =
          `const code = ${escapedJS};\n` +
          `export default code;\n` +
          `export * from "./types"\n`;
        fs.writeFileSync(options.file, outputTS);
      },
    },
    copy({
      targets: [{ src: "src/types.d.ts", dest: "dist" }],
    }),
  ],
};
