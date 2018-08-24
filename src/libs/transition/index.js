const uuid = require('uuid/v4');
const anime = require('animejs');
const lodash = require('lodash');

const styles = require('./index.sass');

class Transition {
  constructor(options) {
    // set optional settings
    this.options = lodash.merge({
      delay: 1000,
      duration: 3000,
      infinite: false || true, // iterations count
      blocks: { // transition blocks in container
        count: 3,
        colors: ['#fbc531', '#353b48', '#2f3640'],
        delays: [500, 500, 500] || []
      },
      load: (() => {
        // get animated image
        const loading = require('loading-svg/loading-spinning-bubbles.svg');

        // create container
        let $_loading = document.createElement('div');
        $_loading.classList.add('loading');

        // create image container
        let $_loadImgContainer = document.createElement('div');
        $_loadImgContainer.classList.add('loading__animated-image')
        let $_loadImg = document.createElement('img')
        $_loadImg.src = loading;
        $_loadImgContainer.appendChild($_loadImg);

        let $_loadText = document.createElement('strong');
        $_loadText.textContent = "Loading";

        // insert partials
        $_loading.appendChild($_loadImgContainer);
        $_loading.appendChild($_loadText);

        return $_loading;
      })() || false
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

    // set load dom to last slide
    if (this.options.load) {
      this.initLoad();
    }

    // add slides to container
    this.blocks.forEach(block => {
      this.$_container.appendChild(block);
    });
  }

  initLoad(load) {
    if (!lodash.compact([this.blocks.length, this.options.load, load]).length) {
      return;
    }

    this.load = load || this.options.load;

    lodash.last(this.blocks).innerHTML = '';
    lodash.last(this.blocks).appendChild(this.load);
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
            duration: this.options.duration - (this.options.blocks.delays[length - key - 1] || 0),
            delay: this.options.blocks.delays[length - key - 1] || 0,
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
    delete this.animatedBlocks;
  }
};

module.exports = Transition;
