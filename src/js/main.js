const cheerio = require('cheerio');
const Transition = require('transition'); // transition to page animation
const RestFull = require('restfull');
const pagesScripts = require('./pages'); // scripts controller
const styles = require('style.sass'); // main styles

// video
const video = require('videos/2018-08-30_19-53-43.mp4');
const poster = require('images/poster.png');

let $_video = document.querySelector('.preview__imac video');
$_video.setAttribute('poster', poster);
$_video.setAttribute('src', video);

// create transition animation
let nextPageTransition = new Transition({
  blocksCount: 3,
  duration: 1200,
  infinite: false,
  blocks: {
    delays: [200, 500, 750],
    colors: ['#353b48', '#f5f6fa', '#fbc531']
  }
});

let loader = new RestFull(page => {
  // create ready template
  let htmlPage = cheerio.load(page);
  // get content from template
  let content = htmlPage('.content').children();

  return content;
});

function showContent(link) {
  nextPageTransition
    .play()
    .then(() => loader.loadContent(link))
    .then(content => {
      // set page content
      setContent(content);
      // initialize main script
      init();
      // initialize page script
      loadScript();
    })
    .then(() => nextPageTransition.reverse())
    .then(() => {
      // close transition animation
      nextPageTransition.disable();
    });
}

function setContent(content) {
  let $_container = document.querySelector('.content');
  $_container.innerHTML = content;
}

function loadScript() {
  let pageName = document.body.getAttribute('name');
  try {
    pagesScripts.init(pageName);
  } catch (e) {
    console.log(`Page "${pageName}" doesn't have any scripts!`);
  }
}

function init() {
  let $_links = document.querySelectorAll('.link[pagePath]');

  $_links.forEach($_link => {
    let link = $_link.getAttribute('pagePath');
    $_link.addEventListener('click', e => {
      let pageName = link.match(/(\w+)\.\w+$/).pop();
      document.body.setAttribute('name', pageName)
      showContent(link);
    });
  });
}

// first init
init();
// load page script
loadScript();
