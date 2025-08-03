module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', ['sentence-case']],
  },
};
