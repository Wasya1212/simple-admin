const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, '../src/js/main.js'),
    path.resolve(__dirname, '../src/sass/style.sass')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(pug|jade)$/,
        exclude: /(node_modules)/,
        use:  [
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      filename: 'frontpage.html',
      template: path.resolve(__dirname, '../src/pug/pages/frontpage.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'documentation.html',
      template: path.resolve(__dirname, '../src/pug/pages/documentation.pug')
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
