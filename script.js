let gameOver = false
let intervalID
const stopwatchDisplay = document.querySelector("#timer")

const stopwatch = () => {
  const start = Date.now();
  displayTime(0)
  intervalID = setInterval(() => {
    // every second do a thing
    let seconds = Math.floor((Date.now() - start)/1000)
    let ms = Math.floor((Date.now() - start)/10)
    displayTime(ms)
  }, 10);
}

const displayTime = (elapsed) => {
  // console.log(elapsed)
  let seconds = (Math.floor(elapsed / 100))
  let r = elapsed % 100
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  if (r < 10) {
    r = "0" + r
  }
  stopwatchDisplay.textContent = `${seconds}:${r}`
}

const stopTimer = () => {
}

const moveSnail = (snail) => {
  snail.nextElementSibling.classList.add("active");
  snail.classList.remove("active");
};

const winCheck = (num) => {
  const currentSnail = (num > 0) ? "red" : "green"
  // console.log("checking win")
  document.querySelectorAll(".space:last-child").forEach((ele) => {
    if (ele.classList.contains("active")) {
      // console.log("winning is happening");
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
  // console.log(e.code);
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
});
