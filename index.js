document.addEventListener("DOMContentLoaded", function () {
  let NO_OF_SQUARES = 9;
  let result = 0;
  let countDownTimer;
  let moleTimer;
  let board = document.querySelector(".mole-board");
  let startBtn = document.querySelector("#start");
  let easyBtn = document.querySelector("#easy");
  let mediumBtn = document.querySelector("#medium");
  let hardBtn = document.querySelector("#hard");
  let score = document.querySelector("#score");
  let highScoreContainer = document.querySelector("#high-score");
  let secondsLeftContainer = document.querySelector("#seconds-left");
  let time = 60; //in seconds
  let hittingPosition;

  let highScore = localStorage.getItem("high-score");
  highScoreContainer.textContent = "High Score: " + (highScore || 0);

  startBtn.addEventListener("click", function () {
    if (NO_OF_SQUARES == 9) {
      mediumBtn.style.display = "none";
      hardBtn.style.display = "none";
      easyBtn.disabled = true;
    } else if (NO_OF_SQUARES == 18) {
      easyBtn.style.display = "none";
      hardBtn.style.display = "none";
      mediumBtn.disabled = true;
    } else {
      easyBtn.style.display = "none";
      mediumBtn.style.display = "none";
      hardBtn.disabled = true;
    }
    startBtn.disabled = true;
    moleMovement();
    countDownTimer = setInterval(countDown, 1000);
  });

  easyBtn.addEventListener("click", function () {
    board.innerHTML = "";
    board.style.width = 310 + "px";
    NO_OF_SQUARES = 9;
    time = 60;
    createBoard();
    startBtn.disabled = false;
  });

  mediumBtn.addEventListener("click", function () {
    board.innerHTML = "";
    board.style.width = 620 + "px";
    NO_OF_SQUARES = 18;
    time = 30;
    createBoard();
    startBtn.disabled = false;
  });

  hardBtn.addEventListener("click", function () {
    board.innerHTML = "";
    board.style.width = 930 + "px";
    NO_OF_SQUARES = 27;
    time = 15;
    createBoard();
    startBtn.disabled = false;
  });

  function createBoard() {
    secondsLeftContainer.textContent = "Seconds Left: " + time;
    for (let i = 0; i < NO_OF_SQUARES; i++) {
      let square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add("square");
      board.appendChild(square);
    }
    let allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
      square.addEventListener("mouseup", function () {
        if (square.id === hittingPosition) {
          result = result + 1;
          score.textContent = "Score: " + result;
        }
        console.log(result);
      });
    });
  }

  function getRandomSquare() {
    let allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
      square.classList.remove("mole");
    });
    let randomSquareIndex = Math.floor(Math.random() * NO_OF_SQUARES);
    let randomSquare = allSquares[randomSquareIndex];
    hittingPosition = randomSquare.id;
    randomSquare.classList.add("mole");
  }

  function moleMovement() {
    moleTimer = setInterval(getRandomSquare, 500);
  }

  function countDown() {
    time--;
    secondsLeftContainer.textContent = "Seconds Left: " + time;
    if (time === 0) {
      let highScore = localStorage.getItem("high-score");
      console.log(highScore);
      clearInterval(countDownTimer);
      clearInterval(moleTimer);
      if (!highScore || result > highScore) {
        localStorage.setItem("high-score", result);
      }
      if (confirm(`Game over. Your score is: ${result}. Play again?`)) {
        window.location.reload(true);
      }
      return;
    }
  }
});
