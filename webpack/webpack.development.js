const merge = require('webpack-merge');
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');

const common = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'frontpage.html',
      template: path.resolve(__dirname, '../src/pug/pages/frontpage.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'documentation.html',
      template: path.resolve(__dirname, '../src/pug/pages/documentation.pug')
    }),
    new Webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
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
