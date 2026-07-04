const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameRunning = true;

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Add click event to every cell
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => cellClicked(index));
});

resetBtn.addEventListener("click", resetGame);

function cellClicked(index) {

    if (board[index] !== "" || !gameRunning) {
        return;
    }

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {

    let winner = false;

    for (let pattern of winPatterns) {

        let a = board[pattern[0]];
        let b = board[pattern[1]];
        let c = board[pattern[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            winner = true;
            break;
        }
    }

    if (winner) {
        statusText.textContent = "🎉 Player " + currentPlayer + " Wins!";
        gameRunning = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "🤝 It's a Draw!";
        gameRunning = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "🎮 Player " + currentPlayer + " Turn";
}

function resetGame() {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    cells.forEach(cell => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameRunning = true;
    statusText.textContent = "🎮 Player X Turn";
}