let gameOver = true
let intervalID
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
  raceInt = setInterval(() => {
    green.value = parseInt(green.value) + greenSpeed
    red.value = parseInt(red.value) + redSpeed
    if (green.value >= 100) {
      clearInterval(raceInt)
      gameOver = true;
      clearInterval(intervalID)
      displayWinner("green")
    }
    if (red.value >= 100) {
      clearInterval(raceInt)
      gameOver = true;
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
    let ms = Math.floor((Date.now() - start)/10)
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

// const moveSnail = (snail) => {
//   snail.nextElementSibling.classList.add("active");
//   snail.classList.remove("active");
// };

// const winCheck = (num) => {
//   const currentSnail = (num > 0) ? "red" : "green"
//   document.querySelectorAll(".space:last-child").forEach((ele) => {
//     if (ele.classList.contains("active")) {
//       gameOver = true;
//       clearInterval(intervalID)
//       setTimeout(() => { window.alert(`${currentSnail} snail wins!!`) }, 100);
//     }
//   });
// };

const handleKeyPress = (e) => {
  if (gameOver) {
    return
  }
  // const snail1 = document.querySelector("#player1-race > .active");
  // const snail2 = document.querySelector("#player2-race > .active");

  switch (e.code) {
    case "KeyP":
      // moveSnail(snail2);
      // winCheck(1);
      redSpeed = 5
      break;
    case "KeyQ":
      // moveSnail(snail1);
      // winCheck(-1);
      greenSpeed = 5
      break;
  };
}

const reset = () => {
  countdownDisplay.textContent = ""
  clearInterval(intervalID)
  clearInterval(raceInt)
  displayTime(0);
  green.value = 0
  red.value = 0
}

// event listeners

document.addEventListener("keyup", handleKeyPress);

document.getElementById("reset-button").addEventListener("click", reset);

document.getElementById("start-button").addEventListener("click", () => {
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
      if(intervalID) {
        clearInterval(intervalID)
      }
      stopwatch();
      startRace();
      gameOver = false;
    }
  }, 1000);
})
