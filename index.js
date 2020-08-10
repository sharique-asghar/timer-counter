let timeDuration = document.querySelector("#timeDuration");
let timeInterval = document.querySelector("#timeInterval");
let deadline = Date.parse(new Date());
let interval = 1;
let timerID;
let upPause = false;
let downPause = false;
let upClock, downClock;

function initializeClock(id, endtime, intervalTime) {
    const clock = document.getElementById(id);
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
    let totalSeconds = 0;

    function updateDownClock() {
      const t = getTimeRemaining(endtime);

      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(downTimerID);
      }
    }

    function updateUpClock() {
        totalSeconds++;
        const t = getTime(endtime, totalSeconds);

        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(upTimerID);
        }
    }

    if (id === "upCounter") {
        updateUpClock();
        upTimerID = setInterval(updateUpClock, intervalTime);
    } else {
        updateDownClock();
        downTimerID = setInterval(updateDownClock, intervalTime);
    }

    return {
        updateUpClock,
        updateDownClock
    }
}

function start() {
    if (timeDuration.value.includes("hour")) {
        let hour = getDigit(timeDuration.value);
        deadline = new Date(Date.parse(new Date()) + hour * 60 * 60 * 1000);
    } else if (timeDuration.value.includes("min")) {
        let minute = getDigit(timeDuration.value);
        deadline = new Date(Date.parse(new Date()) + minute * 60 * 1000);
    } else if (timeDuration.value.includes("sec")) {
        let second = getDigit(timeDuration.value);
        deadline = new Date(Date.parse(new Date()) + second * 1000);
    } else {
        alert("Input is not in correct format");
    }

    if (timeInterval.value.includes("hour")) {
        interval = getDigit(timeInterval.value) * 60 * 60 * 1000;
    } else if (timeInterval.value.includes("min")) {
        interval = getDigit(timeInterval.value) * 60 * 1000;
    } else if (timeInterval.value.includes("sec")) {
        interval = getDigit(timeInterval.value) * 1000;
    } else {
        alert("Input is not in correct format");
    }

    upClock = initializeClock('upCounter', deadline, interval);
    downClock = initializeClock('downCounter', deadline, interval);
}

function reset() {
        clearInterval(upTimerID);
        clearInterval(downTimerID);
        start()
}

function pauseResume(id) {
    if (id === "upCounter") {
        if (upPause) {
            if (!timerID) {
                upClock.updateUpClock();
                upTimerID = setInterval(upClock.updateUpClock, interval);
            }
        } else {
            upPause = true;
            clearInterval(upTimerID);
        }
    } else {
        if (downPause) {
            if (!timerID) {
                downClock.updateDownClock();
                downTimerID = setInterval(downClock.updateDownClock, interval);
            }
        } else {
            downPause = true;
            clearInterval(downTimerID);
        }
    }
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
      total,
      hours,
      minutes,
      seconds
    };
}

function getTime(endtime, count) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds= Math.floor(count % 60);
    const minutes= Math.floor(count / 60);
    const hours= Math.floor(count / (60 * 60));

    return {
        total,
        hours,
        minutes,
        seconds
      };
}

function getDigit(param) {
    return param.match(/\d+/)[0];
};