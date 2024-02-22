let gameOver = false

const startTimer = () => {
}

const stopTimer = () => {
}

const moveSnail = (snail) => {
  snail.nextElementSibling.classList.add("active");
  snail.classList.remove("active");
};

const winCheck = (num) => {
  const currentSnail = (num > 0) ? "red" : "green"
  console.log("checking win")
  document.querySelectorAll(".space:last-child").forEach((ele) => {
    if (ele.classList.contains("active")) {
      console.log("winning is happening");
      gameOver = true;
      setTimeout(() => { window.alert(`${currentSnail} is the winner`) }, 100);
    }
  });
};

const handleKeyPress = (e) => {
  if (gameOver) {
    return
  }
  console.log(e.code);
  const snail1 = document.querySelector("#player1-race > .active");
  const snail2 = document.querySelector("#player2-race > .active");

  switch (e.code) {
    case "KeyP":
      moveSnail(snail2);
      console.log("moved")
      winCheck(1);
      break;
    case "KeyQ":
      moveSnail(snail1);
      winCheck(-1);
      break;
  };
}


document.getElementById("start-button").addEventListener("click", () => {
  startTimer();
  document.addEventListener("keyup", handleKeyPress);
})

document.getElementById("reset-button").addEventListener("click", () => {
  document.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  document.querySelectorAll(".space:first-child").forEach((ele) => {
    ele.classList.add("active");
  });
  gameOver = false;
});
