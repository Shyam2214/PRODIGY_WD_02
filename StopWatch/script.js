let startTime = null;
let elapsedTime = 0;
let intervalId = null;
let lapCount = 0;
const lapList = document.getElementById('lap-list');

const timeDisplay = document.querySelector('.time');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function updateTime() {
  if (startTime) {
    const currentTime = Date.now();
    const totalTime = elapsedTime + currentTime - startTime;

    const hours = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((totalTime / (1000 * 60)) % 60);
    const seconds = Math.floor((totalTime / 1000) % 60);

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    timeDisplay.textContent = formattedTime;
  }
}

function startTimer() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false; // Enable lap button on start
  }
}

function pauseTimer() {
  if (startTime) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    startTime = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

function resetTimer() {
  clearInterval(intervalId);
  startTime = null;
  elapsedTime = 0;
  lapCount = 0;
  lapList.innerHTML = ''; // Clear lap list
  timeDisplay.textContent = '00:00:00';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true; // Disable lap button on reset
}

function recordLap() {
  if (startTime) { // Only allow recording laps if timer is running
    lapCount++;
    const currentTime = Date.now();
    const lapTime = currentTime - startTime; // Calculate elapsed time for this lap

    const formattedLapTime = formatTime(lapTime); // Function to format lap time (implement this function)

    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapCount}: ${formattedLapTime}`;
    lapList.appendChild(lapListItem);
  }
}

// Function to format lap time (implementation example)
function formatTime(lapTime) {
  const milliseconds = lapTime % 1000;
  const seconds = Math.floor((lapTime / 1000) % 60);
  const minutes = Math.floor((lapTime / (1000 * 60)) % 60);
  const formattedLapTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  return formattedLapTime;
}
