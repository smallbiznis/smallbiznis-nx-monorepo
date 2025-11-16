const path = require("node:path");
const typescript = require("@rollup/plugin-typescript");

module.exports = {
  input: path.resolve(__dirname, "index.ts"),
  output: [
    {
      file: path.resolve(__dirname, "dist/index.esm.js"),
      format: "esm"
    }
  ],
  plugins: [
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.lib.json")
    })
  ]
};
