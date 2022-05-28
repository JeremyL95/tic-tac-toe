const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");
const playerDisplay = document.querySelector(".display");
const result = document.querySelector(".result");
const gameStatus = document.querySelector(".game-status");
const btnRestart = document.querySelector(".btn-restart");
const PLAYER_X = "cross";
const PLAYER_O = "circle";
const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let xTurn;
const X_WINS = "<span class='crossDisplay'>X</span>";
const O_WINS = "<span class='circleDisplay'>O</span>";

startGame();

function startGame() {
  xTurn = false;
  boxes.forEach((box) => {
    box.classList.remove(PLAYER_X);
    box.classList.remove(PLAYER_O);
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick, { once: true });
  });
  showTurns();
  result.classList.remove("show");
}

function handleClick(evt) {
  const box = evt.target;
  const currentPlayer = xTurn ? PLAYER_X : PLAYER_O;
  placeSymbol(box, currentPlayer);
  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
    showTurns();
  }
}

function placeSymbol(box, currentPlayer) {
  box.classList.add(currentPlayer);
}

function switchTurns() {
  xTurn = !xTurn;
}

function showTurns() {
  container.classList.remove(PLAYER_X);
  container.classList.remove(PLAYER_O);

  if (xTurn) {
    playerDisplay.innerHTML = `Player <span ${X_WINS}'s Turn`;
    container.classList.add(PLAYER_X);
  } else {
    container.classList.add(PLAYER_O);
    playerDisplay.innerHTML = `Player <span ${O_WINS}'s Turn`;
  }
}

function checkWin(currentPlayer) {
  return winningCondition.some((combination) => {
    return combination.every((index) => {
      return boxes[index].classList.contains(currentPlayer);
    });
  });
}

function isDraw() {
  return [...boxes].every((box) => {
    return box.classList.contains(PLAYER_X) || box.classList.contains(PLAYER_O);
  });
}

function endGame(draw) {
  if (draw) {
    gameStatus.innerText = `It is a draw!`;
  } else {
    gameStatus.innerHTML = `${xTurn ? `Player ${X_WINS}` : `Player ${O_WINS}`} Wins!`;
  }
  result.classList.add("show");
}

btnRestart.addEventListener("click", startGame);
