import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import litcss from "rollup-plugin-postcss-lit";
import copy from "rollup-plugin-copy";

export default {
  input: "./src/index.ts",
  output: [
    {
      dir: "dist",
      format: "es",
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    typescript(),
    postcss({
      minimize: false,
      inject: false,
    }),
    litcss(),
    copy({
      targets: [{ src: "./src/js-icons/*.svg", dest: "./dist/icons" }],
    }),
  ],
};
