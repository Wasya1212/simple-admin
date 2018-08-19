const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = {
  // plugins: [
  //   new CleanWebpackPlugin([
  //     path.resolve(__dirname, '../dist')
  //   ]),
  //   new HtmlWebpackPlugin({
  //     filename: 'frontpage.html',
  //     template: path.resolve(__dirname, '../src/pug/pages/frontpage.pug')
  //   }),
  //   new HtmlWebpackPlugin({
  //     filename: 'documentation.html',
  //     template: path.resolve(__dirname, '../src/pug/pages/documentation.pug')
  //   }),
  //   new ExtractTextPlugin({
  //     filename: './css/style.bundle.css',
  //     allChunks: true,
  //   })
  // ]
};

module.exports = merge([common, webpackCommon]);
