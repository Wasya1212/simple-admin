const uuid = require('uuid/v4');
const anime = require('animejs');
const lodash = require('lodash');

const styles = require('./index.sass');

class Transition {
  constructor(options) {
    // set optional settings
    this.options = lodash.merge({
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
        colors: ['#fbc531', '#353b48', '#2f3640'],
        delays: [500, 500, 500] || []
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

    // set disabled animation
    this.hideContainer();

    // append in the end
    let $_body = document.querySelector('body');
    $_body.appendChild(this.$_container);

    // create colored slides
    this.blocks = [];
    for (let i = 0; i < this.options.blocksCount; i++) {
      let slide = document.createElement('div');
      slide.classList.add('transition-container__slide');
      slide.style.backgroundColor = this.options.blocks.colors[i] || 'transparent';
      this.blocks.push(slide);
    }

    // add slides to container
    this.blocks.forEach(block => {
      this.$_container.appendChild(block);
    });
  }

  get container() {
    // get main block with animated slides
    return this.$_container;
  }

  hideContainer() {
    this.$_container.setAttribute('state', 'disabled');
  }

  showContainer() {
    this.$_container.removeAttribute('state');
  }

  play() {
    // blocks must by full screen
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    this.animatedBlocks = this.blocks.map((block, key) => {
      return anime({
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
            duration: this.options.duration - (this.options.blocks.delays[key] || 0),
            delay: this.options.blocks.delays[key] || 0,
            elasticity: 0
          }
        ],
        easing: 'easeInOutQuad',
        loop: this.options.infinite
      });
    });

    // make enabled
    this.showContainer();

    return Promise.all(this.animatedBlocks.map(block => {
      return block.finished;
    }));
  }

  reverse() {
    // blocks must by full screen
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    this.animatedBlocks = this.blocks.map((block, key, {length}) => {
      return anime({
        targets: block,
        translateX: [
          {
            value: 0,
            duration: 0,
            delay: 0,
            elasticity: 0
          },
          {
            value: screenWidth,
            duration: this.options.duration - (this.options.blocks.delays[length - key] || 0),
            delay: this.options.blocks.delays[length - key] || 0,
            elasticity: 0
          }
        ],
        easing: 'easeInOutQuad',
        loop: this.options.infinite
      });
    });

    // make enabled
    this.showContainer();

    return Promise.all(this.animatedBlocks.map(block => {
      return block.finished;
    }));
  }

  disable() {
    this.hideContainer();
    this.stop();
    delete this.animatedBlocks;
  }

  stop() {

  }

  pause() {

  }
}

module.exports = Transition;
