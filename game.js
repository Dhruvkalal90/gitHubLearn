document.getElementById("start-btn").addEventListener("click", function() {
  const now = new Date().getTime();
  const endTime = now + 7200 * 1000; // 2 hours in milliseconds
  localStorage.setItem("endTime", endTime);
  runTimer();
});

function runTimer() {
  let progress = document.getElementById("progress");
  let timerDisplay = document.getElementById("timer");
  let endTime = localStorage.getItem("endTime");

  if (!endTime) return; // No timer to run if not started

  let intervalId = setInterval(() => {
    const now = new Date().getTime();
    let timeRemaining = (endTime - now) / 1000; // Time remaining in seconds

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      progress.style.width = "100%";
      timerDisplay.textContent = "Done!";
      localStorage.removeItem("endTime");
      return;
    }

    // Calculate progress
    let totalDuration = 7200; // 2 hours in seconds
    let timeElapsed = totalDuration - timeRemaining;
    let progressPercent = (timeElapsed / totalDuration) * 100;
    progress.style.width = progressPercent + "%";

    // Calculate days, hours, minutes, and seconds remaining
    let days = Math.floor(timeRemaining / 86400); // Seconds in a day
    let hours = Math.floor((timeRemaining % 86400) / 3600);
    let minutes = Math.floor((timeRemaining % 3600) / 60);
    let seconds = Math.floor(timeRemaining % 60);

    // Convert to AM/PM format
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'

    // Format the timer display
    let dayDisplay = days > 0 ? `${days}d ` : ''; // Display days only if > 0
    timerDisplay.textContent = `${dayDisplay}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }, 1000);
}

// Automatically start the timer if it was running before a page reload
window.onload = function() {
  if (localStorage.getItem("endTime")) {
    runTimer();
  }
};