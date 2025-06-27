const video = document.querySelector(".video");
const player = document.querySelector(".player");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector("#play-btn");
const volumeBtn = document.querySelector("#volume-btn");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const timeElapsed = document.querySelector(".time-elapsed");
const timeDuration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const fullscreenBtnIcon = document.querySelector(".fullscreen i");

// Play & Pause ----------------------------------- //

// change the play/pause icon to play
const showPlayIcon = function () {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
};

const togglePlay = function () {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "pause");
  } else {
    video.pause();
    showPlayIcon();
  }
};

// event fire when video ended
video.addEventListener("ended", showPlayIcon);

// Progress Bar ---------------------------------- //

// go to the position where the prgress bar selected
const seekTime = function (e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
};

// get the time
const getDisplayTimes = function (time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const updateProgressBar = function () {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  timeElapsed.textContent = `${getDisplayTimes(video.currentTime)} /`;
  timeDuration.textContent = getDisplayTimes(video.duration);
};

// Volume Controls --------------------------- //

let lastVolume = 1;

// changing the icon of according to the volume
const changeVolumeIcon = function (volumeEl) {
  volumeBtn.className = "";
  if (volumeEl > 0.7) {
    volumeBtn.classList.add("fas", "fa-volume-up");
  } else if (volumeEl < 0.7 && volumeEl > 0) {
    volumeBtn.classList.add("fas", "fa-volume-down");
  } else {
    volumeBtn.classList.add("fas", "fa-volume-off");
  }
};

// change the volume bar
const updateVolume = function (e) {
  let newVolume = e.offsetX / volumeRange.offsetWidth;
  if (newVolume < 0.1) {
    newVolume = 0;
  }
  if (newVolume > 0.9) {
    newVolume = 1;
  }
  volumeBar.style.width = `${newVolume * 100}%`;
  video.volume = newVolume;
  // remove all classes from volume icon and change according to the volume
  changeVolumeIcon(newVolume);
  lastVolume = newVolume;
};

const toggleVolumeBtn = function () {
  volumeBtn.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeBtn.classList.add("fas", "fa-volume-mute");
    volumeBtn.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    changeVolumeIcon(video.volume);
    volumeBtn.setAttribute("title", "Mute");
  }
};

// Change Playback Speed -------------------- //

const videoSpeed = function () {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //

/* View in fullscreen */
const openFullscreen = function (elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
  fullscreenBtnIcon.classList.replace("fa-expand", "fa-compress");
};

/* Close fullscreen */
const closeFullscreen = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
  fullscreenBtnIcon.classList.replace("fa-compress", "fa-expand");
};

let fullscreen = false;

const toggleFullScreen = function () {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
};

// event listener
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("canplay", updateProgressBar);
video.addEventListener("timeupdate", updateProgressBar);
progressRange.addEventListener("click", seekTime);
volumeRange.addEventListener("click", updateVolume);
volumeBtn.addEventListener("click", toggleVolumeBtn);
speed.addEventListener("change", videoSpeed);
fullscreenBtn.addEventListener("click", toggleFullScreen);
