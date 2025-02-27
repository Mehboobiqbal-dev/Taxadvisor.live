// .eslintrc.js

module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
      sourceType: 'module', // Allows use of imports
      ecmaFeatures: {
        jsx: true, // Allows parsing of JSX
      },
    },
    settings: {
      react: {
        version: 'detect', // Detect React version
      },
    },
    env: {
      browser: true, // Enable browser global variables
      es2021: true, // Enable ECMAScript 2021 globals
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
      'plugin:@typescript-eslint/recommended', // Uses recommended rules from @typescript-eslint/eslint-plugin
      'plugin:react-hooks/recommended', // Enforces rules of Hooks
      'next/core-web-vitals', // Includes Next.js specific linting rules
    ],
    plugins: ['@typescript-eslint', 'react'],
    rules: {
      // Place to specify custom ESLint rules.
      // e.g., '@typescript-eslint/explicit-function-return-type': 'off',
    },
  };
  