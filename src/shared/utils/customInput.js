const progressVideo = document.querySelector('.progress-video');
const progressVolume = document.querySelector('.progress-volume');
const btnVolume = document.querySelector('.volume');
const video = document.querySelector('.video');
const buttonPlayMain = document.querySelector('.btn-play-main');
const btnPlayPause = document.querySelector('.play');
const btnFullScreen = document.querySelector('.btn-full-screen');
let volumeValue = 40;
progressVolume.value = volumeValue;



progressVolume.addEventListener('input', function(){
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  if (value==0) {
    btnVolume.classList.add('mute');
    btnVolume.classList.remove('volume');
  } else {
    btnVolume.classList.add('volume');
    btnVolume.classList.remove('mute');
  }
})




function setProgressTimer() {
  progressVideo.value = (video.currentTime / video.duration) * 100;
  if (video.currentTime === video.duration) {
    progressVideo.value = 0;
    // stopVideo();
  }
  progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVideo.value}%, #C4C4C4 ${progressVideo.value}%, #C4C4C4 100%)`;
};

function seen() {
  video.currentTime = (progressVideo.value / 100) * video.duration;
  let value = progressVideo.value
  if (video.currentTime) {
    progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  }    
}


video.addEventListener('timeupdate', setProgressTimer);
progressVideo.addEventListener('input', seen);
