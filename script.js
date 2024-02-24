let gameOver = true
let intervalID
const stopwatchDisplay = document.querySelector("#timer")
const countdownDisplay = document.querySelector("#countdown")

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

const stopTimer = () => {
}

const moveSnail = (snail) => {
  snail.nextElementSibling.classList.add("active");
  snail.classList.remove("active");
};

const winCheck = (num) => {
  const currentSnail = (num > 0) ? "red" : "green"
  document.querySelectorAll(".space:last-child").forEach((ele) => {
    if (ele.classList.contains("active")) {
      gameOver = true;
      clearInterval(intervalID)
      setTimeout(() => { window.alert(`${currentSnail} snail wins!!`) }, 100);
    }
  });
};

const handleKeyPress = (e) => {
  if (gameOver) {
    return
  }
  const snail1 = document.querySelector("#player1-race > .active");
  const snail2 = document.querySelector("#player2-race > .active");

  switch (e.code) {
    case "KeyP":
      moveSnail(snail2);
      winCheck(1);
      break;
    case "KeyQ":
      moveSnail(snail1);
      winCheck(-1);
      break;
  };
}

const displayCountdown = (input) => {
  countdownDisplay.textContent = input
}

// event listeners

document.addEventListener("keyup", handleKeyPress);

document.getElementById("start-button").addEventListener("click", () => {
  let count = 3
  displayCountdown(count)
  countdownDisplay.classList.remove("fade")
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
      gameOver = false;
    }
  }, 1000);
})

document.getElementById("reset-button").addEventListener("click", () => {
  if(intervalID) {
    clearInterval(intervalID)
  }
  document.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  document.querySelectorAll(".space:first-child").forEach((ele) => {
    ele.classList.add("active");
  });
  gameOver = false;
  displayTime(0);
});
