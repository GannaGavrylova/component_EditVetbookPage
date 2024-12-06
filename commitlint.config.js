export default {
  extends: ['@commitlint/config-conventional'],
  defaultIgnores: true,
  defaultWarnings: true,
  rules: {
    'type-enum': [1, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
    'type-case': [1, 'always', 'lower-case'],
    'type-empty': [1, 'never'],
    'scope-case': [1, 'always', ['lower-case', 'pascal-case', 'camel-case']],
    'subject-empty': [1, 'never'],
    'subject-full-stop': [1, 'never', '.'],
    'header-max-length': [1, 'always', 72],
  },
}
