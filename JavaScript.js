let timer; // Timer variable
let isRunning = false; // Flag to track if stopwatch is running
let startTime; // Start time of the stopwatch
let pausedTime = 0; // Time when paused
let laps = []; // Array to store lap times

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const lapResetBtn = document.getElementById('lapReset');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function startPause() {
  if (!isRunning) {
    // Start the stopwatch
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    startTime = Date.now() - pausedTime;
    timer = setInterval(updateDisplay, 10); // Update display every 10ms
  } else {
    // Pause the stopwatch
    isRunning = false;
    startPauseBtn.textContent = 'Resume';
    clearInterval(timer);
    pausedTime = Date.now() - startTime;
  }
}

function lapReset() {
  if (isRunning) {
    // Record lap time
    const lapTime = Date.now() - startTime;
    laps.unshift(lapTime); // Add lap time to the beginning of laps array

    // Display lap time
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapsList.insertBefore(lapItem, lapsList.firstChild);
  } else {
    // Reset stopwatch
    clearInterval(timer);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    display.textContent = '00:00.000';
    pausedTime = 0;
    laps = [];
    lapsList.innerHTML = '';
  }
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  startPauseBtn.textContent = 'Start';
  display.textContent = '00:00.000';
  pausedTime = 0;
  laps = [];
  lapsList.innerHTML = '';
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}
