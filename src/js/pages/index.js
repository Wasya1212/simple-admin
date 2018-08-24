const pages = Object.create(null);

pages['frontpage'] = require('./frontpage');
pages['examples'] = require('./examples');
pages['get_started'] = require('./get_started');

module.exports.init = page => {
  pages[page].init();
}

module.exports.pages = pages;
