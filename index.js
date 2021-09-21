document.addEventListener("DOMContentLoaded", function () {
  let NO_OF_SQUARES = 9;

  let board = document.querySelector(".mole-board");
  let startBtn = document.querySelector("#start");
  let easyBtn = document.querySelector("#easy");
  let mediumBtn = document.querySelector("#medium");
  let hardBtn = document.querySelector("#hard");

  startBtn.addEventListener("click", function () {
    moleMovement();
  });

  easyBtn.addEventListener("click", function () {
    board.innerHTML = "";
    board.style.width = 310 + "px";
    NO_OF_SQUARES = 9;
    createBoard();
  });

  mediumBtn.addEventListener("click", function () {
    board.innerHTML = "";
    board.style.width = 620 + "px";
    NO_OF_SQUARES = 18;
    createBoard();
  });

  hardBtn.addEventListener("click", function () {
    board.innerHTML = "";
    board.style.width = 930 + "px";
    NO_OF_SQUARES = 27;
    createBoard();
  });

  function createBoard() {
    for (let i = 0; i < NO_OF_SQUARES; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      board.appendChild(square);
    }
    //startBtn.setAttribute("disabled", true);
  }

  function getRandomSquare() {
    let allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
      square.classList.remove("mole");
    });
    console.log(allSquares);
    let randomSquareIndex = Math.floor(Math.random() * NO_OF_SQUARES);
    let randomSquare = allSquares[randomSquareIndex];
    randomSquare.classList.add("mole");
  }

  function moleMovement() {
    let moleTimer = setInterval(getRandomSquare, 1000);
  }
});
