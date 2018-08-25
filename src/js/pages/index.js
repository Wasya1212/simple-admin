const pages = Object.create(null);

pages['frontpage'] = require('./scripts/frontpage');
pages['examples'] = require('./scripts/examples');
pages['get_started'] = require('./scripts/get_started');

module.exports.init = page => {
  pages[page].init();
}

module.exports.pages = pages;
