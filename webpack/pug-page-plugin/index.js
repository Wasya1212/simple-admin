const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports.createTemplatePlugins = foulder => {
  const pages = [];

  fs.readdirSync(foulder).forEach(filename => {
    pages.push(
      new HtmlWebpackPlugin({
        filename,
        template: `${foulder}/${filename}`
    }));
  });

  return pages;
}
