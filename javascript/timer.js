const timer = document.getElementById("timer");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");
const pauseBtn = document.getElementById("pausebtn");
const resumeBtn = document.getElementById("resumebtn");

// Add Milliseconds for easier debugging

let initialCount = (4 * 60 * 60 * 1000); // hours times minutes times seconds times milliseconds
let date = new Date().getMilliseconds();
let difference;
let timerInterval;

let activeButton = "pause";

function init() {
  hours.innerHTML = initialCount / (60 * 60 * 1000) % 24;
  minutes.innerHTML = initialCount / (60 * 1000) % 60;
  seconds.innerHTML = (initialCount * 1000) % 60;
  milliseconds.innerHTML = Math.floor((initialCount) % 1000);
  timerInterval = setInterval(updateTimer , 10);

  pauseBtn.addEventListener('click', pauseTimer);
  resumeBtn.addEventListener('click', resumeTimer);
}

let updateTimer = () => {
  initialCount -= 10;

  hours.innerHTML = Math.floor(initialCount / (60 * 60 * 1000) % 24);
  minutes.innerHTML = Math.floor((initialCount / (60 * 1000)) % 60);
  seconds.innerHTML = Math.floor((initialCount / 1000) % 60);
  milliseconds.innerHTML = Math.floor((initialCount) % 1000);
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
