// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const Webpack = require('webpack');
// const path = require('path');
//
// module.exports = {
//   entry: {
//     main: path.resolve(__dirname, './src/js/main.js')
//   },
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: '[name].bundle.js'
//   },
//   plugins: [
//     new CleanWebpackPlugin([
//       path.resolve(__dirname, './dist')
//     ]),
//     new HtmlWebpackPlugin({
//       filename: 'frontpage.html',
//       template: path.resolve(__dirname, './src/pug/pages/frontpage.pug')
//     }),
//     new HtmlWebpackPlugin({
//       filename: 'documentation.html',
//       template: path.resolve(__dirname, './src/pug/pages/documentation.pug')
//     }),
//     new Webpack.HotModuleReplacementPlugin()
//   ],
//   module: {
//     rules: [
//       {
//        test: /\.html$/,
//        use: [
//          {
//            loader: "html-loader",
//            options: { minimize: true }
//          }
//        ]
//      },
//      {
//         test: /\.(pug|jade)$/,
//         exclude: /(node_modules)/,
//         use:  [
//           'html-loader',
//           {
//             loader: 'pug-html-loader'
//           }
//         ]
//       }
//     ]
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, './dist'),
//     compress: true,
//     port: 5000,
//     index: 'frontpage.html',
//     open: true,
//     overlay: {
//       warnings: true,
//       errors: true
//     },
//     historyApiFallback: true,
//     inline: true
//   }
// };
'use strict';

const MODE = process.env.NODE_ENV || 'development';

module.exports = () => {
  switch (MODE) {
    case 'production':
      return require('./webpack/webpack.production');
      break;
    case 'development':
      return require('./webpack/webpack.development');
      break;
    default:
      return require('./webpack/webpack.development');
  }
};
