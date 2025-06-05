let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O is human
let gameOver = false;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    gameOver = false;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

const disablesBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o");
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablesBoxes();
    gameOver = true;
};

// Basic AI that makes a random move
const aiMove = () => {
    if (gameOver) return;

    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    let box = boxes[randomIndex];

    box.innerText = "X";
    box.classList.add("x");
    turnO = true;
    checkWinner();
};

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText.toUpperCase();
        let pos2val = boxes[pattern[1]].innerText.toUpperCase();
        let pos3val = boxes[pattern[2]].innerText.toUpperCase();

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return;
            }
        }
    }

    // Check for draw
    const isDraw = [...boxes].every((box) => box.innerText !== "");
    if (isDraw && !gameOver) {
        msg.innerText = `It's a Draw!`;
        msgcontainer.classList.remove("hide");
        disablesBoxes();
        gameOver = true;
    }
};

// Add click listeners for human player (O)
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!turnO || box.innerText !== "" || gameOver) return;

        box.innerText = "O";
        box.classList.add("o");
        turnO = false;
        checkWinner();

        if (!gameOver) {
            setTimeout(aiMove, 500); // slight delay for realism
        }
    });
});

newGamebtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
