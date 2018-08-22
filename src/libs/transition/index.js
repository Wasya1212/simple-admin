const merge = require('merge');
const uuid = require('uuid/v4');
const anime = require('animejs');

const styles = require('./index.sass');

class Transition {
  constructor(options) {
    // set optional settings
    this.options = merge({
      direction: {
        from: 'right' || 'left' || 'top' || 'bottom',
        to: 'left' || 'right' || 'top' || 'bottom',
        inverse: false || true
      },
      delay: 1000,
      duration: 3000,
      infinite: false || true, // iterations count
      blocks: { // transition blocks in container
        count: 3,
        colors: ['#fbc531', '#353b48', '#2f3640']
      },
      load: {
        contentDOM: () => {
          let $_loadText = document.createElement('h4');
          $_loadText.classList.add('loading');
          $_loadText.textContent = 'Loading...';
          return $_loadText;
        } || false, // dom view of load container
        showDuration: 0, // time duration to show load container
        blockNumber: 2 // block which contain load container
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
      slide.style.backgroundColor = this.options.blocks.colors[i];
      this.slides.push(slide);
    }

    // add slides to container
    this.slides.forEach(slide => {
      this.$_container.appendChild(slide);
    });
  }

  get container() {
    // get main block with animated slides
    return this.$_container;
  }

  start() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let relativeOffset = anime.timeline({
      loop: this.options.infinite
    });

    this.slides.forEach((block, key) => {
      anime({
        targets: block,
        translateX: [
          {
            value: screenWidth,
            duration: 0,
            delay: 0,
            elasticity: 0
          },
          {
            value: 0,
            duration: () => {
              return anime.random(
                this.options.duration * 0.75,
                this.options.duration
              );
            },
            delay: this.options.delay + (this.options.duration * key * 0.25),
            elasticity: 0
          }
        ],
        loop: this.options.infinite
      });
    });
  }

  stop() {

  }

  pause() {

  }
}

module.exports = Transition;
