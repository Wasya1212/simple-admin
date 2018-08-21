const merge = require('merge');
const uuid = require('uuid/v4');
const anime = require('animejs');

class Transition {
  constructor(options) {
    // set optional settings
    this.options = merge({
      direction: {
        from: 'right' || 'left' || 'top' || 'bottom',
        to: 'left' || 'right' || 'top' || 'bottom',
        inverse: false
      },
      delay: 1000,
      duration: 3000,
      infinite: false || true,
      blocksCount: 3,
      load: {
        contentDOM: () => {
          let $_loadText = document.createElement('h4');
          $_loadText.classList.add('loading');
          $_loadText.textContent = 'Loading...';
          return $_loadText;
        } || false,
        showDuration: 0,
        blockNumber: 2
      }
    }, options || {});

    // create trasnition elements container
    this.containerId = uuid();
    this.$_container = document.createElement('section');
    this.$_container.classList.add('transition-container');
    this.$_container.id = `tr-container-${this.containerId}`;

    // append in the end
    let $_body = document.querySelector('body');
    $_body.appendChild(this.$_container);

    // create colored slides
    this.slides = [];
    for (let i = 0; i < this.options.blocksCount; i++) {
      let slide = document.createElement('div');
      slide.classList.add('transition-container__slide');
      this.slides.push(slide);
    }

    // add slides to container
    slides.forEach(slide => {
      this.$_container.appendChild(slide);
    });
  }

  get container() {
    // get main block with animated slides
    return this.$_container;
  }
}

let nextPageTransition = new Transition({
  blocksCount: 5
});

console.log(nextPageTransition.options);
