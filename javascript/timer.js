const timer = document.getElementById("timer");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const pauseBtn = document.getElementById("pausebtn");
const resumeBtn = document.getElementById("resumebtn");

// Add Milliseconds for easier debugging

let initialCount = (4 * 60 * 60); // hours times minutes times seconds
let date = new Date().getMilliseconds();
let difference;
let timerInterval;

let activeButton = "pause";

function init() {
  hours.innerHTML = initialCount / (60 * 60) % 24;
  minutes.innerHTML = initialCount / (60) % 60;
  seconds.innerHTML = initialCount % 60;
  timerInterval = setInterval(updateTimer , 1000);

  pauseBtn.addEventListener('click', pauseTimer);
  resumeBtn.addEventListener('click', resumeTimer);
}

let updateTimer = () => {
  initialCount--;

  hours.innerHTML = Math.floor(initialCount / (60 * 60) % 24);
  minutes.innerHTML = Math.floor((initialCount / 60) % 60);
  seconds.innerHTML = Math.floor(initialCount % 60);
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
    timerInterval = setInterval(updateTimer , 1000);
    activeButton = "pause";
  }
}

init();
