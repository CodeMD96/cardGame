const gameCounter = document.getElementsByClassName("win-tracker");
const container = document.getElementById("container")
const startAgain = document.getElementById("start-again");
const heading = document.getElementById("heading");
const scoreCard = document.getElementsByClassName("scorecard");
const cardImg = document.getElementById("card-img");
const aceButtons = document.getElementById("ace-buttons");
const oneButton = document.getElementById("one");
const elevenButton = document.getElementById("eleven");
const draw = document.getElementById("draw");
const hold = document.getElementById("hold");

let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"]
let suits = ["spades", "hearts", "clubs", "diamonds"]
let picked = []

let currentPlayer = 0;
let scores = [0, 0];
let playerWins = [0, 0];
let cardScore = 0

const aceFunc = () => {
    heading.innerHTML = "11 or 1?";
    draw.style.display = "none";
    hold.style.display = "none";
    aceButtons.style.display = "block";
}

const scoreUpdate = () =>{
    scores[currentPlayer] += cardScore;
    scoreCard[currentPlayer].innerHTML = scores[currentPlayer];

    if (scores[currentPlayer] == 21) {
        playerWins[`${currentPlayer}`] ++;
        gameCounter[`${currentPlayer}`].innerHTML = `Player ${currentPlayer+1}: ${playerWins[currentPlayer]}`;
        heading.innerHTML = `Player ${currentPlayer+1} wins!`;
        reset();
    } else if (scores[currentPlayer] > 21) {
        if (currentPlayer == 0) {
            playerWins[1] ++;
            gameCounter[1].innerHTML = `Player 2: ${playerWins[1]}`;
        } else {
            playerWins[0] ++;
            gameCounter[0].innerHTML = `Player 1: ${playerWins[0]}`;
        }
        heading.innerHTML = `Bust, Player ${currentPlayer+1} loses!`;
        reset();
    };
}

const playerChange = () =>{
    if (currentPlayer == 0) {
        currentPlayer = 1;
        heading.innerHTML = "Player 2's turn";
        document.body.style.backgroundColor = "red";
        container.style.borderColor = "green";
    } else {
        currentPlayer = 0;
        heading.innerHTML = "Player 1's turn";
        document.body.style.backgroundColor = "green";
        container.style.borderColor = "red";
    };
};

const reset = () =>{
    startAgain.innerHTML = "Start again!";
    startAgain.style.display = "block";
    draw.style.display = "none";
    hold.style.display = "none";
    aceButtons.style.display = "none";
}

draw.addEventListener("click", () =>{
    let randomValue = Math.floor(Math.random()*13);
    let randomSuit = Math.floor(Math.random()*4);

    if (picked.includes(`images/${values[randomValue]}_of_${suits[randomSuit]}.png`) == false) {
        if (values[randomValue] === "ace") {
            aceFunc();
        } else if (typeof values[randomValue] === 'string') {
            cardScore = 10;
            scoreUpdate();
        } else {
            cardScore = values[randomValue];
            scoreUpdate();
        };
    
        cardImg.src = `images/${values[randomValue]}_of_${suits[randomSuit]}.png`;
        picked.push(`images/${values[randomValue]}_of_${suits[randomSuit]}.png`);
    };
});

oneButton.addEventListener("click", () => {
    cardScore = 1;
    heading.innerHTML = "Player 1";
    scoreCard[currentPlayer].innerHTML = scores[currentPlayer];
    aceButtons.style.display = "none";
    draw.style.display = "block";
    hold.style.display = "block";

    scoreUpdate();
});

elevenButton.addEventListener("click", () => {
    cardScore = 11;
    heading.innerHTML = "Player 1";
    scoreCard[currentPlayer].innerHTML = scores[currentPlayer];
    aceButtons.style.display = "none";
    draw.style.display = "block";
    hold.style.display = "block";

    scoreUpdate();
});

hold.addEventListener("click", () =>{
    if (currentPlayer == 0) {
        playerChange();
    } else if (scores[0] == scores[1]) {
        heading.innerHTML = "Tie!";
        reset();
    } else if (21-scores[0] > 21-scores[1]) {
        playerWins[1] ++;
        gameCounter[1].innerHTML = `Player 2: ${playerWins[1]}`;
        heading.innerHTML = "Player 2 wins!";
        reset();
    } else {
        playerWins[0] ++;
        gameCounter[0].innerHTML = `Player 1: ${playerWins[0]}`;
        heading.innerHTML = "Player 1 wins!";
        reset();
    }
      
})

startAgain.addEventListener("click", () =>{
    if (currentPlayer == 1) {
        playerChange();
    }
    scores = [0, 0];
    picked = []

    heading.innerHTML = "Player 1";
    scoreCard[0].innerHTML = scores[0];
    scoreCard[1].innerHTML = scores[1];
    startAgain.style.display = "none";
    draw.style.display = "block";
    hold.style.display = "block";
});