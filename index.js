let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn"); 
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // true for playerO, false for playerX

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGme = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    const boxValues = Array.from(boxes).map(box => box.innerText);

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const pos1Val = boxValues[a];
        const pos2Val = boxValues[b];
        const pos3Val = boxValues[c];
        
        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("winner", pos1Val);
            showWinner(pos1Val);
            return;
        }
    }

    // Check for draw
    if (Array.from(boxes).every(box => box.innerText)) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText) return; // Ignore if box is already filled
        
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turnO = !turnO; // Toggle turn

        box.disabled = true;

        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGme);
resetBtn.addEventListener("click", resetGme);
