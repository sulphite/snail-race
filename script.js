let gameOver = false
let intervalID
const stopwatchDisplay = document.querySelector("#timer")

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
      setTimeout(() => { window.alert(`${currentSnail} is the winner`) }, 100);
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


document.getElementById("start-button").addEventListener("click", () => {
  if(intervalID) {
    clearInterval(intervalID)
  }
  stopwatch();
  document.addEventListener("keyup", handleKeyPress);
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
