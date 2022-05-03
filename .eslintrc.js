module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-hooks',
    'simple-import-sort',
    '@typescript-eslint',
    'prettier'
  ],
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    // enables eslint-plugin-prettier and eslint-config-prettier
    // this will display prettier errors as ESLint errors
    // make sure this is always the last configuration in the extends array
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      // allows for the parsing of JSX
      jsx: true
    }
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    'constructor-super': 'error',
    curly: 'error',
    'dot-notation': 'error',
    'eslint-comments/no-unlimited-disable': 'off',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-match': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-inner-declarations': 'off',
    'no-irregular-whitespace': 'off',
    'no-else-return': 'error',
    'no-param-reassign': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ExportDefaultDeclaration',
        message: 'Prefer named exports'
      }
    ],
    'no-shadow': 'off',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-hooks/exhaustive-deps': 'error',
    'react/boolean-prop-naming': 'error',
    'react/display-name': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'always', children: 'ignore' }
    ],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/no-unescaped-entities': 'error',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'require-yield': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^\\u0000'], ['^react', '^@?\\w'], ['^(app)(/.*|$)']]
      }
    ],
    'sort-imports': 'off'
  },
  settings: {
    react: {
      version: '17.0.2'
    }
  }
}
