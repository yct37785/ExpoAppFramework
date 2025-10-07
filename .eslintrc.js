module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    // avoid circular deps by blocking barrel imports from Framework internals
    'no-restricted-imports': ['error', {
      paths: [
        {
          name: 'framework/ui',
          message: 'Inside src/UI/** use relative imports to avoid circular dependencies.',
        },
      ],
      patterns: [
        // block any source path that ends up importing the public barrel from inside Framework
        '**/src/UI/index',       // defensive (if an index slips in)
        '**/Exports/UI',         // matches ../../Exports/UI
        '**/Exports/UI.*',       // matches ../../Exports/UI.ts / .tsx
      ],
    }],

    // keep imports tidy
    'import/order': ['warn', {
      groups: ['builtin','external','internal','parent','sibling','index','object','type'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
  },
};
