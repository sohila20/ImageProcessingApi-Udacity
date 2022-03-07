module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'prettier/prettier': 2,
        'no-var': 'error',
        'prefer-const': 'error',
        '@typescript-eslint/no-var-requires': 1,
    }
}