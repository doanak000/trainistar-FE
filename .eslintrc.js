module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'semi': [2, 'never'],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'eol-last': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: ['error', 'single'],
    'max-lines': ['error', 10000],
    'comma-dangle': ['error', 'never'],
    'no-process-env': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        semi: false,
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        'no-unused-vars': ['off'],
        singleQuote: true,
        jsxSingleQuote: true,
        endOfLine: 'auto',
        trailingComma: 'none'
      }
    ]
  }
}
