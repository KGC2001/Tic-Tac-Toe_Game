const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
const turn=document.getElementById('turn');

let currentPlayer = 'X';

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
  const cell = e.target;

  if (cell.textContent === '' && !checkWinner()) {
    cell.textContent = currentPlayer;
    if (checkWinner()) {
      
      turn.textContent=`${currentPlayer}`+"  Player won game";
      setTimeout(resetGame, 15000);
      
    } else if (isBoardFull()) {
      
      turn.textContent="Match draw";
      setTimeout(resetGame, 15000);
      
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      turn.textContent="Player :  "+`${currentPlayer}`+"  turn";
    }
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]           // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    turn.textContent="Player :  X  turn";
  });
  currentPlayer = 'X';
}
