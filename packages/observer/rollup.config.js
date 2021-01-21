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
        const typesTS = fs.readFileSync("./src/types.d.ts", {
          encoding: "utf8",
        });
        const outputJS = fs.readFileSync(options.file, { encoding: "utf8" });
        const escapedJS = JSON.stringify(outputJS);
        const outputTS =
          `const code = ${escapedJS};\n` +
          `export default code;\n` +
          `${typesTS}`;
        fs.writeFileSync(options.file, outputTS);
      },
    },
  ],
};
