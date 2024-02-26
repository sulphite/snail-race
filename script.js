let gameOver = true
let allowInput = false
let intervalID
let countdownInterval
let raceInt
const stopwatchDisplay = document.querySelector("#timer")
const countdownDisplay = document.querySelector("#countdown")
const displayCountdown = (input) => {
  countdownDisplay.textContent = input
}

const green = document.getElementById("green")
const red = document.getElementById("red")
let greenSpeed = 0
let redSpeed = 0

const startRace = () => {
  console.log("starting a race")
  raceInt = setInterval(() => {
    green.value = parseInt(green.value) + greenSpeed
    red.value = parseInt(red.value) + redSpeed
    if (green.value >= 100) {
      clearInterval(raceInt)
      gameOver = true;
      allowInput = false;
      clearInterval(intervalID)
      displayWinner("green")
    }
    if (red.value >= 100) {
      clearInterval(raceInt)
      gameOver = true;
      allowInput = false;
      clearInterval(intervalID)
      displayWinner("red")
    }
    if (greenSpeed > -1) {
      greenSpeed--
    }
    if (redSpeed > -1) {
      redSpeed--
    }
  }, 100);
}

const stopwatch = () => {
  const start = Date.now();
  displayTime(0)
  intervalID = setInterval(() => {
    let ms = Math.floor((Date.now() - start) / 10)
    displayTime(ms)
  }, 10);
}

const displayTime = (elapsed) => {
  let seconds = (Math.floor(elapsed / 100))
  let remainder = elapsed % 100
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  if (remainder < 10) {
    remainder = "0" + remainder
  }
  stopwatchDisplay.textContent = `${seconds}:${remainder}`
}

const displayWinner = (winner) => {
  countdownDisplay.textContent = "WINNER!"
  countdownDisplay.classList.remove("fade")
  countdownDisplay.classList.add(winner)
}

const handleKeyPress = (e) => {
  if (!allowInput) {
    return
  }

  switch (e.code) {
    case "KeyP":
      redSpeed = 5
      break;
    case "KeyQ":
      greenSpeed = 5
      break;
  };
}

const reset = () => {
  countdownDisplay.textContent = ""
  clearInterval(countdownInterval)
  clearInterval(intervalID)
  clearInterval(raceInt)
  displayTime(0);
  green.value = 0
  red.value = 0
  greenSpeed = 0
  redSpeed = 0
}

// event listeners

document.addEventListener("keyup", handleKeyPress);

document.getElementById("reset-button").addEventListener("click", reset);

document.getElementById("start-button").addEventListener("click", () => {
  console.log({gameOver})
  if(!gameOver) {
    return
  }
  gameOver = false
  reset()
  let count = 3
  displayCountdown(count)
  countdownDisplay.classList.remove("fade", "red", "green")
  countdownInterval = setInterval(() => {
    count--
    displayCountdown(count)

    if (count < 1) {
      clearInterval(countdownInterval)
      displayCountdown("GO!")
      countdownDisplay.classList.add("fade")
      if (intervalID) {
        clearInterval(intervalID)
      }
      stopwatch();
      startRace();
      allowInput = true;
    }
  }, 1000);
})
