module.exports = {
  plugins: [
    'node',
  ],
  env: {
    node: true,
  },
  extends: [
    './rules/best-practices',
    './rules/errors',
    './rules/es6',
    './rules/imports',
    './rules/variables',
  ].map(require.resolve),
  rules: {},
};
