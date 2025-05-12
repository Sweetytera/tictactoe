const prompt = require('prompt-sync')(); // Fixed spelling error
let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = '🐐';
let gameActive = true;

function printBoard() {
  console.log(`
 ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
-----------
 ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
-----------
 ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
  `);
}

function checkWin() {
  const conditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return conditions.some(([a, b, c]) => {
    return gameBoard[a] === currentPlayer &&
           gameBoard[b] === currentPlayer &&
           gameBoard[c] === currentPlayer;
  });
}

function handleMove(position) {
  if (gameBoard[position] === ' ') {
    gameBoard[position] = currentPlayer;
  } else {
    console.log("Cell already taken, choose another one.");
    return false;
  }

  if (checkWin()) {
    printBoard();
    console.log(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return true;
  }

  if (gameBoard.every(cell => cell !== ' ')) {
    printBoard();
    console.log("It's a draw!");
    gameActive = false;
    return true;
  }

  currentPlayer = currentPlayer === '🐐' ? '🍇' : '🐐';
  return true;
}

while (gameActive) {
  printBoard();
  const position = prompt(`Player ${currentPlayer}, enter your move (0-8): `);
  const posNum = parseInt(position);

  if (posNum >= 0 && posNum <= 8) {
    handleMove(posNum);
  } else {
    console.log("Invalid position, enter a number between 0 and 8.");
  }
}
