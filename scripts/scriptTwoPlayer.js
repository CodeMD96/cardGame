const gameCounter = document.getElementsByClassName("win-tracker");
const startAgain = document.getElementById("start-again");
const heading = document.getElementById("heading");
const scoreCards = document.getElementsByClassName("scorecard");
const diceImg = document.getElementById("dice-img")
const roll = document.getElementById("roll");

let currentPlayer = 0;
let scores = [0, 0];
let playerWins = [0, 0];

roll.addEventListener("click", () =>{
    let diceRoll = Math.floor(Math.random()*6+1);
    scores[`${currentPlayer}`] += diceRoll;
    scoreCards[`${currentPlayer}`].innerHTML = scores[`${currentPlayer}`];

    diceImg.src = `images/dice${diceRoll}.png`

    if (diceRoll === 1) {
        playerWins[`${currentPlayer}`] -= 1;

        startAgain.innerHTML = "Too bad, try again!";
        heading.innerHTML = `Player ${currentPlayer+1} lost!`;
        gameCounter[`${currentPlayer}`].innerHTML = `Player ${currentPlayer+1}: ${playerWins[currentPlayer]}`;
        startAgain.style.display = "block";
        roll.style.display = "none";
    } else if (scores[`${currentPlayer}`] > 20) {
        playerWins[`${currentPlayer}`] += 1;

        startAgain.innerHTML = "Start again!";
        heading.innerHTML = `Player ${currentPlayer+1} wins!`;
        gameCounter[`${currentPlayer}`].innerHTML = `Player ${currentPlayer+1}: ${playerWins[currentPlayer]}`;
        startAgain.style.display = "block";
        roll.style.display = "none";
    } else if (currentPlayer === 0) {
        currentPlayer = 1;
        heading.innerHTML = "Player 2";
        document.body.style.backgroundColor = "purple";
    } else {
        currentPlayer = 0;
        heading.innerHTML = "Player 1";
        document.body.style.backgroundColor = "indigo";
    };
});

startAgain.addEventListener("click", () =>{
    currentPlayer = 0;
    scores = [0, 0];

    heading.innerHTML = "Player 1";
    document.body.style.backgroundColor = "indigo";
    scoreCards[0].innerHTML = 0;
    scoreCards[1].innerHTML = 0;
    startAgain.style.display = "none";
    roll.style.display = "block";  
})