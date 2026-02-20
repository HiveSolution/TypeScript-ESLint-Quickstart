import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '.github/**', '.vscode/**']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      prettier: prettier
    },
    rules: {
      ...prettierConfig.rules,
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true
        }
      ],
      'prettier/prettier': [
        'error',
        {
          parser: 'typescript',
          trailingComma: 'none',
          singleQuote: true
        }
      ],
      'prefer-const': 'warn',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require'
        },
        {
          selector: 'memberLike',
          modifiers: ['public'],
          format: ['camelCase', 'UPPER_CASE', 'snake_case'],
          leadingUnderscore: 'forbid'
        },
        {
          selector: 'method',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid'
        }
      ],
      indent: ['error', 2]
    }
  }
];
