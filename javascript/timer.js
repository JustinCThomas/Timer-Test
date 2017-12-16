const timer = document.getElementById("timer");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");
const millContainer = document.getElementById("milliseconds-container");
const pauseBtn = document.getElementById("pausebtn");
const resumeBtn = document.getElementById("resumebtn");


// Fix timer no longer updating when tab is not in focus

let initialCount = (4 * 60 * 60 * 1000); // hours times minutes times seconds times milliseconds
let date = new Date().getMilliseconds();
let difference;
let timerInterval;

let activeButton = "pause";

let init = () => {
  let timeLeft = calculateTime();
  hours.innerHTML = ("0" + timeLeft.hours).slice(-2);
  minutes.innerHTML = ("0" + timeLeft.minutes).slice(-2);
  seconds.innerHTML = ("0" + timeLeft.seconds).slice(-2);
  milliseconds.innerHTML = ("00" + timeLeft.milliseconds).slice(-3);
  timerInterval = setInterval(updateTimer , 10);
  millContainer.addEventListener('click', () => {
    millContainer.classList.toggle("hide-milliseconds");
  });
  pauseBtn.addEventListener('click', pauseTimer);
  resumeBtn.addEventListener('click', resumeTimer);
}

let calculateTime = () => {
  let hours = Math.floor(initialCount / (60 * 60 * 1000) % 24);
  let minutes = Math.floor(initialCount / (60 * 1000) % 60);
  let seconds = Math.floor((initialCount / 1000) % 60);
  let milliseconds = Math.floor((initialCount) % 1000);
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  }
}

let updateTimer = () => {
  initialCount -= 10;
  let timeLeft = calculateTime();

  hours.innerHTML = ("0" + timeLeft.hours).slice(-2);
  minutes.innerHTML = ("0" + timeLeft.minutes).slice(-2);
  seconds.innerHTML = ("0" + timeLeft.seconds).slice(-2);
  milliseconds.innerHTML = ("00" + timeLeft.milliseconds).slice(-3);
  date = new Date().getMilliseconds();
}

let pauseTimer = () => {
  if (activeButton === "pause") {
    clearInterval(timerInterval);
    let currentTime = new Date().getMilliseconds();
    difference = (currentTime - date);
    activeButton = "resume";
  }
}

let resumeTimer = () => {
  if (activeButton === "resume") {
    setTimeout(updateTimer, difference);
    timerInterval = setInterval(updateTimer , 10);
    activeButton = "pause";
  }
}

init();
