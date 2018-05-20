const nuxt = require('./nuxt.config.js');
const resolve = require('path').resolve

const webpack = {
  config: {
    resolve: {
      extensions: ['.js', '.vue', '.ts'],
      alias: {
        '~': resolve(__dirname, nuxt.srcDir || ''),
        '~~': __dirname,

        '@': resolve(__dirname, nuxt.srcDir || ''),
        '@@': __dirname,
      }
    }
  }
}

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'typescript-eslint-parser'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',

    'standard',
  ],
  plugins: [
    'vue',
    'import',
  ],
  // add your custom rules here
  rules: {
    'vue/require-default-prop': "off",
    'vue/max-attributes-per-line': "off",

    "space-before-function-paren": ["error", "never"],
    "semi": ["error", "always"],

    "no-console": "off",
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],

    'no-var': 'error',
    'template-curly-spacing': 'error',
    'prefer-template': 'error',
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: true,
    }],

    // For typescript
    'no-unused-vars': 'off',
    'no-undef': 'off'
  },

  settings: {
    'import/resolver': { webpack }
  }

}
