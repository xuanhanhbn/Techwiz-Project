module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    "plugin:jest/recommended",
  ],
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
    // Các quy tắc eslint của bạn có thể được cấu hình ở đây
    // Ví dụ:
    // 'indent': ['error', 2],
    // 'linebreak-style': ['error', 'unix'],
    // 'quotes': ['error', 'single'],
    // 'semi': ['error', 'never']
  }
};
