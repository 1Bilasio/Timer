window.addEventListener('DOMContentLoaded', function() {
    var countdownElement = document.getElementById('countdown');
    var startButton = document.getElementById('start-btn');
    var pauseButton = document.getElementById('pause-btn');
    var resetButton = document.getElementById('reset-btn');
    var restartButton = document.getElementById('restart-btn');
    var stopAlarmButton = document.getElementById('stop-alarm-btn');
    var alarmSound = document.getElementById('alarm');
    var progressBar = document.getElementById('progress-bar');
    var themeToggle = document.getElementById('theme-toggle');
    var timer;
    var totalTime;
    var isPaused = false;
    var remainingTime;
    var initialTime;

    function playAlarm() {
      alarmSound.play();
    }

    function stopAlarm() {
      alarmSound.pause();
      alarmSound.currentTime = 0;
      stopAlarmButton.classList.add('hidden');
    }

    function updateCountdown() {
      var hoursLeft = Math.floor(totalTime / 3600);
      var minutesLeft = Math.floor((totalTime % 3600) / 60);
      var secondsLeft = Math.floor(totalTime % 60);

      countdownElement.innerHTML = hoursLeft.toString().padStart(2, '0') + ':' +
                                    minutesLeft.toString().padStart(2, '0') + ':' +
                                    secondsLeft.toString().padStart(2, '0');

      if (totalTime < 10) {
        countdownElement.classList.add('warning');
      } else {
        countdownElement.classList.remove('warning');
      }

      var progressPercentage = ((initialTime - totalTime) / initialTime) * 100;
      progressBar.style.width = progressPercentage + '%';

      document.title = countdownElement.innerHTML + ' - Countdown Timer';
    }

    startButton.addEventListener('click', function() {
      if (!isPaused) {
        var hours = parseInt(document.getElementById('hours').value);
        var minutes = parseInt(document.getElementById('minutes').value);
        var seconds = parseInt(document.getElementById('seconds').value);

        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0) {
          alert("Please enter valid positive values.");
          return;
        }

        totalTime = (hours * 3600) + (minutes * 60) + seconds;
        initialTime = totalTime;
      } else {
        totalTime = remainingTime;
        isPaused = false;
      }

      timer = setInterval(function() {
        updateCountdown();
        totalTime--;

        if (totalTime < 0) {
          clearInterval(timer);
          countdownElement.innerHTML = 'Time is up!';
          countdownElement.classList.add('warning');
          playAlarm();
          stopAlarmButton.classList.remove('hidden');
        }
      }, 1000);
      startButton.classList.add('hidden');
      restartButton.classList.remove('hidden');
      pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
    });

    pauseButton.addEventListener('click', function() {
      if (isPaused) {
        startButton.click();
        pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
      } else {
        clearInterval(timer);
        isPaused = true;
        remainingTime = totalTime;
        pauseButton.innerHTML = '<i class="fas fa-play"></i> Resume';
      }
    });

    resetButton.addEventListener('click', function() {
      clearInterval(timer);
      countdownElement.innerHTML = '';
      totalTime = 0;
      remainingTime = 0;
      isPaused = false;
      stopAlarm();
      progressBar.style.width = '0';
      countdownElement.classList.remove('warning');
      startButton.classList.remove('hidden');
      restartButton.classList.add('hidden');
      pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
      document.title = 'Countdown Timer';
    });

    restartButton.addEventListener('click', function() {
      clearInterval(timer);
      totalTime = initialTime;
      isPaused = false;
      startButton.click();
    });

    stopAlarmButton.addEventListener('click', function() {
      stopAlarm();
    });

    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      themeToggle.innerHTML = document.body.classList.contains('light-theme') ? 
        '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        startButton.click();
      } else if (event.key === ' ') {
        pauseButton.click();
      } else if (event.key === 'r') {
        resetButton.click();
      }
    });
  });