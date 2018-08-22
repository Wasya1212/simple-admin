const Transition = require('transition');

let nextPageTransition = new Transition({
  blocksCount: 3,
  duration: 1200,
  infinite: true,
  blocks: {
    delays: [0, 500, 750],
    colors: ['#353b48', '#f5f6fa', '#fbc531']
  }
});

nextPageTransition.start();
