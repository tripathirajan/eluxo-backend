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
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
  {
    files: ["server/plugins/*.js"], // ⬅️ your CJS files
    languageOptions: {
      sourceType: "script", // this treats it as CommonJS
    },
  },
];
