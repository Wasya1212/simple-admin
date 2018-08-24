const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PugPagePlugin = require('./pug-page-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pugPagesPlugins = PugPagePlugin.createTemplatePlugins(path.resolve(__dirname, '../src/pug/pages'));

module.exports = {
  context: path.resolve(__dirname, '../src/sass/style.sass'),
  entry: {
    main: path.resolve(__dirname, '../src/js/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js'
  },
  optimization: {
    minimize: false,
    nodeEnv: 'none'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'es2017']
          }
        }
      },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, '../src/sass')
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[sha512:hash:base64:12].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'frontpage.html',
      template: path.resolve(__dirname, '../src/pug/pages/frontpage.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'documentation.html',
      template: path.resolve(__dirname, '../src/pug/pages/documentation.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'download.html',
      template: path.resolve(__dirname, '../src/pug/pages/download.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'examples.html',
      template: path.resolve(__dirname, '../src/pug/pages/examples.pug')
    }),
    new HtmlWebpackPlugin({
      filename: 'get_started.html',
      template: path.resolve(__dirname, '../src/pug/pages/get_started.pug')
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src/libs'),
      path.resolve(__dirname, '../src/sass')
    ]
  }
};
