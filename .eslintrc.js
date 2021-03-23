module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  rules: {
    'prettier/prettier': [
      {
        htmlWhitespaceSensitivity: 'strict'
      },
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:vue/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {}
}
