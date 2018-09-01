const {default: videojs} = require('video.js');
const styles = require('videoplayer.sass');

// get video files
const imac_video = require('videos/2018-08-31_18-41-31 - imac.mp4');
const ipad_video = require('videos/2018-08-30_19-53-43 - ipad.mp4');
const iphone_video = require('videos/2018-08-30_19-53-43 - iphone.mp4');
const setup__video = require('videos/setup.mp4');

// get video posters
const imac_poster = require('images/poster.png');
const ipad_poster = require('images/poster.png');
const iphone_poster = require('images/poster.png');

module.exports.init = () => {
  // get video container
  let $_imac_video = document.querySelector('.preview__imac video');
  let $_ipad_video = document.querySelector('.preview__ipad video');
  let $_iphone_video = document.querySelector('.preview__iphone video');

  // disable control from videos
  $_imac_video.controls = false;
  $_ipad_video.controls = false;
  $_iphone_video.controls = false;

  // set posters to video containers
  $_imac_video.setAttribute('poster', imac_poster);
  $_ipad_video.setAttribute('poster', ipad_poster);
  $_iphone_video.setAttribute('poster', iphone_poster);

  var player = videojs('example-video', {
    controll: true,
    autoplay: false
  });

  console.log(player);

  // player.play();
  player.pause();
}
