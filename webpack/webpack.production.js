const merge = require('webpack-merge');
const path = require('path');
const webpackCommon = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = {
  minimize: true,
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
    nodeEnv: 'production'
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    })
  ]
};

let options = merge([webpackCommon, common]);

module.exports = options;
