
const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset');
const newBtn = document.querySelector('#new');
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg');
const playerScoreBoard = document.querySelector('#playerScore');
const aiScoreBoard = document.querySelector('#aiScore');
const turnIndicator = document.querySelector('#turnIndicator');
const blurArea = document.querySelector('.blur-area');

let playerTurn = true; // O = player, X = AI
let playerScore = 0;
let aiScore = 0;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const resetGame = () => {
  playerTurn = true;
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("o", "x");
    box.style.backgroundColor = "";
  });
  msgContainer.classList.add('hide');
  blurArea.classList.remove('blur');
  turnIndicator.innerText = "Your Turn (O)";
};

const disableAll = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
  msg.innerText = `🎉 '${winner}' Wins!`;
  msgContainer.classList.remove('hide');
  blurArea.classList.add('blur');
  if (winner === "O") playerScore++;
  else aiScore++;
  updateScore();
};

const showDraw = () => {
  msg.innerText = `It's a DRAW!`;
  msgContainer.classList.remove('hide');
  blurArea.classList.add('blur');
};

const updateScore = () => {
  playerScoreBoard.innerText = playerScore;
  aiScoreBoard.innerText = aiScore;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      boxes[a].style.backgroundColor = "#90ee90";
      boxes[b].style.backgroundColor = "#90ee90";
      boxes[c].style.backgroundColor = "#90ee90";
      disableAll();
      showWinner(boxes[a].innerText);
      return true;
    }
  }

  const isDraw = [...boxes].every(box => box.innerText !== "");
  if (isDraw) {
    showDraw();
    return true;
  }

  return false;
};

const aiMove = () => {
  const emptyBoxes = [...boxes].filter(box => box.innerText === "");
  if (emptyBoxes.length === 0) return;
  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  randomBox.innerText = "X";
  randomBox.classList.add("x");
  randomBox.disabled = true;
  playerTurn = true;
  turnIndicator.innerText = "Your Turn (O)";
  checkWinner();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerTurn && box.innerText === "") {
      box.innerText = "O";
      box.classList.add("o");
      box.disabled = true;
      playerTurn = false;
      turnIndicator.innerText = "AI Turn (X)";
      if (!checkWinner()) {
        setTimeout(aiMove, 500);
      }
    }
  });
});

resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', resetGame);

