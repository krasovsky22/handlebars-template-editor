/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, './src'),
    '@views': path.resolve(__dirname, './src/views'),
    '@hooks': path.resolve(__dirname, './src/hooks'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@models': path.resolve(__dirname, './src/models'),
    '@stores': path.resolve(__dirname, './src/stores'),
    '@database': path.resolve(__dirname, './src/database'),
    '@components': path.resolve(__dirname, './src/components'),
  })
);
