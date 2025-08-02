module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
  ],
  plugins: ['prettier', 'security', 'node'],
  rules: {
    'prettier/prettier': 'warn',
    'max-lines': ['warn', 300],
    'max-lines-per-function': ['warn', 50],
    complexity: ['warn', 10],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'security/detect-object-injection': 'warn',
  },
};
