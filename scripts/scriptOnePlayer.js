const startAgain = document.getElementById("start-again");
const heading = document.getElementById("heading");
const scoreCard = document.getElementById("score-card");
const cardImg = document.getElementById("card-img");
const aceButtons = document.getElementById("ace-buttons");
const oneButton = document.getElementById("one");
const elevenButton = document.getElementById("eleven");
const roll = document.getElementById("roll");

let suits = ["spades", "hearts", "clubs", "diamonds"]
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"]

let score = 0
let cardScore = 0

const aceFunc = () => {
    heading.innerHTML = "11 or 1?";
    roll.style.display = "none";
    aceButtons.style.display = "block";
}

roll.addEventListener("click", () =>{
    let randomValue = Math.floor(Math.random()*13);
    let randomSuit = Math.floor(Math.random()*4);

    if (values[randomValue] === "ace") {
        aceFunc();
    } else if (typeof values[randomValue] === 'string') {
        cardScore = 10;
    } else {
        cardScore = values[randomValue]
    };
    score += cardScore;
    scoreCard.innerHTML = score;

    cardImg.src = `images/${values[randomValue]}_of_${suits[randomSuit]}.png`;

    if (values[randomValue] === "ace") {
        aceFunc();
    } else if (score > 20) {
        startAgain.innerHTML = "Start again!";
        heading.innerHTML = "Winner!";
        startAgain.style.display = "block";
        roll.style.display = "none";
    };
});

oneButton.addEventListener("click", () => {
    score += 1;
    heading.innerHTML = "Player 1";
    scoreCard.innerHTML = score;
    aceButtons.style.display = "none";
    roll.style.display = "block";
});

elevenButton.addEventListener("click", () => {
    score += 11;
    heading.innerHTML = "Player 1";
    scoreCard.innerHTML = score;
    aceButtons.style.display = "none";
    roll.style.display = "block";
});

startAgain.addEventListener("click", () =>{
    score = 0;

    heading.innerHTML = "Player 1";
    scoreCard.innerHTML = score;
    startAgain.style.display = "none";
    roll.style.display = "block";

    
})