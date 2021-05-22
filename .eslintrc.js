module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      "jsx": true
    }
  },
  env:{
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    semi: [2,'never'],
    indent: [2, 2],
    strict: 0,
    'no-console': 0,
    'react/prop-types': [0]
  },
  overrides: [
    {
      "files": ["**/*.js"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ]
}
