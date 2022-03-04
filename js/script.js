import i18Obj from '../translate.js';


//hamburger menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.closeMenu');
const navButton = document.querySelectorAll('.nav-link');
const cover = document.querySelector('.cover');

function toggleMenu() {
    menu.classList.toggle('openMenu');
    hamburger.classList.toggle("is-active");
    cover.classList.toggle("darkened");
}

hamburger.addEventListener('click', toggleMenu);
navButton.forEach((el) => el.addEventListener('click', removeMenuClass));

function removeMenuClass() {
    menu.classList.remove('openMenu');
    cover.classList.toggle("darkened");
    hamburger.classList.toggle("is-active");
}

//change photos
const portfolioBtns = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.photo-card');

portfolioBtns.forEach((elem) => elem.addEventListener('click', changeImage));

function changeImage(event) {
    if(event.target.classList.contains('portfolio-btn')) {
        portfolioImages.forEach((img, index) => img.style.backgroundImage = `url(./assets/img/${event.target.dataset.season}/${index + 1}.jpg)`);
    }
}

//preload images
const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages() {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      seasons.forEach((season) => img.src = `./assets/img/${season}/${i}.jpg`);
    }
  }
  
preloadImages();

portfolioBtns.forEach((btn) => btn.addEventListener('click', changeClassActive));

function changeClassActive(event) {
  portfolioBtns.forEach((btn) => btn.classList.remove('active'));
  event.target.classList.add('active');
}

//switch languages
function getTranslate(lang) {
  const listOfDataI18 = document.querySelectorAll('[data-i18]');
  listOfDataI18.forEach((date) => {
      date.textContent = i18Obj[lang][date.dataset.i18];
      date.placeholder = i18Obj[lang][date.dataset.i18];
  })
}

const en = document.querySelector('.en');
const ru = document.querySelector('.ru');

ru.addEventListener('click', () => getTranslate('ru'));
en.addEventListener('click', () => getTranslate('en'));


//Player
//Elements
const player = document.querySelector('div.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const volume = player.querySelector('.volume');
const togglePlayButton = player.querySelector('.toggle__play');
const onscreenButton = player.querySelector('.player__button_onscreen');
const ranges = player.querySelectorAll('.player__slider');

//Functions
function togglePlay() {
  (video.paused) ? video.play() : video.pause();
  onscreenButton.classList.toggle('player__button_onscreen_off');
}

function updatePlayState() {
  const playIcon = this.paused ? '►' : '❚ ❚';
  togglePlayButton.textContent = playIcon;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleVolume() {
  const percent = volume.value * 100;
  volume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, rgb(200, 200, 200) ${percent}%, rgb(200, 200, 200) 100%)`;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, rgb(200, 200, 200) ${percent}%, rgb(200, 200, 200) 100%)`;
  progress.value = percent;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

  //Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayState);
video.addEventListener('pause', updatePlayState);
video.addEventListener('timeupdate', handleProgress);
volume.addEventListener('click', handleVolume);
onscreenButton.addEventListener('click', togglePlay);
togglePlayButton.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate, handleVolume));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate, handleVolume));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
