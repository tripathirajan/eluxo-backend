import eslintJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      "prettier/prettier": "warn",
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
