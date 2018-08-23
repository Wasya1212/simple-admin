const cheerio = require('cheerio');
const styles = require('style.sass');

const Transition = require('transition');

let nextPageTransition = new Transition({
  blocksCount: 3,
  duration: 1200,
  infinite: false,
  blocks: {
    delays: [200, 500, 750],
    colors: ['#353b48', '#f5f6fa', '#fbc531']
  }
});

function showContent(link) {
  nextPageTransition
    .play()
    .then(() => loadContent('.content', link))
    .then(content => {
      let $_container = document.querySelector('.content');
      $_container.innerHTML = content;
    })
    .then(() => nextPageTransition.reverse())
    .then(() => {
      nextPageTransition.disable();
      init();
    });
}

function loadContent(container_name, link) {
  let http = createRequestObject();

  return new Promise((resolve, reject) => {
    if(http) {
      http.open('get', link);
        http.onreadystatechange = function () {
          if(http.readyState == 4) {
            // create ready template
            let htmlPage = cheerio.load(http.responseText);
            // get content from template
            let content = htmlPage(container_name).children();
            setTimeout(() => {
              resolve(content);
            }, 3000);
            // resolve(content);
          }
        }
        http.send(null);
    } else {
      document.location = link;
      resolve(null);
    }
  });
}

// ajax object
function createRequestObject() {
  try {
    return new XMLHttpRequest()
  } catch(e) {
    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch(e) {
      try {
        return new ActiveXObject('Microsoft.XMLHTTP');
      } catch(e) {
        return null;
      }
    }
  }
}

function init() {
  let $_menu = document.querySelectorAll('.link');

  $_menu.forEach(menu => {
    let link = menu.getAttribute('href');
    menu.removeAttribute('href');
    menu.setAttribute('nohref', '');
    menu.addEventListener('click', e => {
      showContent(link);
    });
  });
}

init();
