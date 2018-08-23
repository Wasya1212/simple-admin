const merge = require('webpack-merge');
const path = require('path');
const Webpack = require('webpack');
const webpackCommon = require('./webpack.common');

const common = {
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist/html'),
    compress: false,
    port: 5000,
    index: 'frontpage.html',
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    inline: true
  }
};

module.exports = merge([common, webpackCommon]);
