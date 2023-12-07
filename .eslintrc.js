module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    "prettier",
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    "allowExpressions ": true,
    "allowTypedFunctionExpressions": true
  },
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  env: {
    "browser": true,
    "es6": true
  },
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of yarn modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
};
