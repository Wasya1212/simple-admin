const Transition = require('transition');

let nextPageTransition = new Transition({
  blocksCount: 5,
  duration: 3000,
  infinite: true
});

nextPageTransition.start();
