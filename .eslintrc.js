module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 樣板字面值錯誤
    'template-curly-spacing': 'off',
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'max-len': 'off',
    'no-underscore-dangle': 'off', // 物件 key 不可有底線 ex: user._id
  },
  // defineProps、defineEmits 未定義錯誤
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
  },
};
