module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  plugins: [
    '@stylistic/js'
  ],
  "extends": [
    'eslint:recommended',
    'prettier'
  ],
  "rules": {
    '@stylistic/js/indent': [
      'error',
      2
    ],
    '@stylistic/js/linebreak-style': 0,
    // '@stylistic/js/quotes': [
    //   'error',
    //   'single',
    //   "double",
    //   {
    //     'avoidEscape': true,
    //     'allowTemplateLiterals': true
    //   }
    // ],
    '@stylistic/js/semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',    //comment these out maybe?
    'object-curly-spacing': [    //comment these out maybe?
      'error', 'always'
    ],
    'arrow-spacing': [    //comment these out maybe?
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
  }
}