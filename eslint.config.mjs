// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'class', next: ['class field', 'class static field', 'method'] },
      ],
      // Пустая строка между методами и полями
      'lines-around-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      // Разрешает не больше одной пустой строки подряд
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
      endOfLine: 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 120,
          singleAttributePerLine: true,
          bracketSpacing: true,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  },
);
