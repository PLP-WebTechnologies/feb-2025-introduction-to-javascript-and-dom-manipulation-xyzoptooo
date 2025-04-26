// Pomodoro Timer Variables
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const timerModeDisplay = document.getElementById('timer-mode');

let workDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let isWorkTime = true;
let timer = workDuration;
let timerInterval = null;

// Update timer display in mm:ss format
function updateTimerDisplay() {
  const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
  const seconds = (timer % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Switch between work and break modes
function switchMode() {
  isWorkTime = !isWorkTime;
  timer = isWorkTime ? workDuration : breakDuration;
  timerModeDisplay.textContent = isWorkTime ? 'Work' : 'Break';
  updateTimerDisplay();
}

// Start the timer
function startTimer() {
  if (timerInterval) return; // Prevent multiple intervals
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      updateTimerDisplay();
    } else {
      switchMode();
    }
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Reset the timer
function resetTimer() {
  pauseTimer();
  timer = isWorkTime ? workDuration : breakDuration;
  updateTimerDisplay();
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize timer display and mode
timerModeDisplay.textContent = 'Work';
updateTimerDisplay();
