const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
const board = Array(9).fill(null);

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

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (board.every(cell => cell !== null)) {
        alert('It\'s a tie!');
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
