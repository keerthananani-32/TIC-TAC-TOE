const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const result = document.getElementById('result');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
  cell.removeEventListener('click', handleClick);
  if (checkWin(currentClass)) {
    result.textContent = `${currentClass} Wins`;
    endGame();
  } else if (isDraw()) {
    result.textContent = 'Draw!';
  } else {
    isXTurn = !isXTurn;
  }
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function startGame() {
  isXTurn = true;
  result.textContent = '';
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

restartButton.addEventListener('click', startGame);

startGame();
