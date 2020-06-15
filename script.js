
const sun = document.getElementById('sun');
const rain = document.getElementById('rain');
const night = document.getElementById('night');
const pause = document.getElementById('pause');
const play = document.getElementById('play');
const video = document.getElementById('video');
const timer = document.getElementById('timer');
const twoMin = document.getElementById('2-min');
const fiveMin = document.getElementById('5-min');
const tenMin = document.getElementById('10-min');

let playTimer = false
let newTime = 300
let absTime = 300
play.style.opacity = 0;


// Countdown
const clockCountDown = setInterval(countDown, 1000);

// Weather music
const testWeather = document.querySelectorAll('.test-weather');

testWeather.forEach(element => {
  element.addEventListener('click', (e) => {

    let moodArray = ['sun', 'night', 'rain']
    let moodDataSet = e.target.dataset.mood;

    // Make button appear
    play.style.opacity = 1;

    // Change Song and Background

      // Select elements
      const mood = moodArray.filter(moodEl => moodEl === moodDataSet)[0]
      let moodActive = document.getElementById(`${mood}-a`);
      let moodSample = document.getElementById(`${mood}-sample`);
      const indexActiveMood = moodArray
        .findIndex(mood => mood === `${moodDataSet}`);

      // Change elements
      video.src = `img/${mood}.mp4`;
      moodActive.classList.add('active');
      moodSample.play();
      // moodSample.loop();

      // Select other elements and update them
      moodArray.splice(indexActiveMood, 1);
      document.getElementById(`${moodArray[0]}-sample`).pause();
      document.getElementById(`${moodArray[1]}-sample`).pause();
      document.getElementById(`${moodArray[0]}-a`).classList.remove('active');;
      document.getElementById(`${moodArray[1]}-a`).classList.remove('active');;

    clearInterval(clockCountDown);

    if (playTimer === false) {
      setInterval(countDown, 1000);
      playTimer = true
      togglePlayer();
    }

  });

});

// ADD EVENT LISTENERS

// Timer edit
twoMin.addEventListener('click', () => changeTime(12));
fiveMin.addEventListener('click', () => changeTime(300));
tenMin.addEventListener('click', () => changeTime(600));

// Pause
pause.addEventListener('click', function(){
  togglePlayer();
  playTimer = false

  // Select the div that is active
  const findClass = testWeather.forEach(element => {
    // Select its children
     if (element.classList.contains('active')) {
      // Pause its audio element
      element.children[1].pause()
     }

  });

});

play.addEventListener('click', function(){
  togglePlayer();
  playTimer = true

  // Select the div that is active
  const findClass = testWeather.forEach(element => {
    // Select its children
     if (element.classList.contains('active')) {
      // Pause its audio element
      element.children[1].play()
     }

  });
});


// REFACTOR FUNCTIONS

// Toggle function
function togglePlayer() {
  pause.classList.toggle('hidden');
  play.classList.toggle('hidden');
}

// Change player function
function changePlayer() {
  pause.classList.remove('hidden');
  play.classList.remove('hidden');
  play.classList.add('hidden');
};


// Circle loader
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}

// Change Time
function changeTime(value) {
  newTime = value
  absTime = value
  playTimer = true;
  changePlayer();
}

// Countdown
function countDown() {

  if (playTimer) {
      let newMinutes, newSeconds, el, countdown, totalTime;

          totalTime = Math.floor(( (absTime - newTime) / absTime) *100);
          newMinutes = Math.floor(newTime / 60);
          newSeconds = newTime % 60;

          newMinutes = (newMinutes < 10) ? `0${newMinutes}` : newMinutes;
          newSeconds = (newSeconds < 10) ? `0${newSeconds}` : newSeconds;

          countdown = timer.textContent = `${newMinutes}:${newSeconds}`;

          if(newTime <= -1) {
            timer.textContent = "Time's up 😇"
            playTimer = false
            return audio.pause();
          };

          if (totalTime <= 100) {
            setProgress(totalTime);
          }
          newTime--;
    };
};


