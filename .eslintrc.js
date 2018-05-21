module.exports = {
  plugins: ['node'],
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script'
  },
  env: {
    es6: true,
    node: true,
    jest: true
  },
  rules: {
    'no-console': 0,
    semi: [2, 'never'],
    quotes: [2, 'single', 'avoid-escape']
  }
}