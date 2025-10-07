const tsParser = require('@typescript-eslint/parser');
const tseslint = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');

module.exports = [
  // ignore patterns (replaces .eslintignore)
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      'apps/*/dist/**',
      'packages/*/dist/**',
    ],
  },

  // main TS/TSX config
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    // bring in recommended rulesets
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // avoid importing the public UI barrel from within Framework internals
      'no-restricted-imports': ['error', {
        paths: [
          {
            name: 'framework/ui',
            message: 'Inside packages/Framework/src/UI/** use relative imports to avoid circular deps.',
          },
        ],
        patterns: [
          '**/src/UI/index', // defensive
          '**/Exports/UI',   // ../../Exports/UI
          '**/Exports/UI.*', // ../../Exports/UI.ts / .tsx
        ],
      }],

      // tidy import order
      'import/order': ['warn', {
        groups: ['builtin','external','internal','parent','sibling','index','object','type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
    },
  },

  // disable stylistic rules that clash with Prettier
  prettier,
];
