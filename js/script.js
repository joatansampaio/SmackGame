const spots = document.querySelectorAll(".hole");
const scoreText = document.querySelector(".game-score");
const characters = document.querySelectorAll(".mole");
const countdownText = document.querySelector(".countdown");
const startButton = document.querySelector(".start-button");
const bestScoreText = document.querySelector(".best-score");
const gameContainer = document.querySelector(".game-container");

let lastHole;
let gameOver = false;
let gameDuration = 30000;
let gameScore = 0;
let countdown;

let bestScore = localStorage.getItem("best-score");
bestScoreText.textContent = "All time best: " + bestScore;

function pickRandomHole(spots) {
   const randomHole = Math.floor(Math.random() * spots.length);
   const hole = spots[randomHole];
   if (hole === lastHole) {
      return pickRandomHole(spots);
   }
   lastHole = hole;
   return hole;
}

function popOut() {
   const time = Math.random() * 1000 + 400;
   const hole = pickRandomHole(spots);
   hole.classList.toggle("up");
   setTimeout(function () {
      hole.classList.toggle("up");
      if (!gameOver) popOut();
   }, time);
}

function startGame() {
   countdown = gameDuration / 1000;
   scoreText.textContent = "Score: " + 0;
   scoreText.style.display = "block";
   countdownText.textContent = countdown;
   gameOver = false;
   gameScore = 0;
   popOut();
   setTimeout(() => {
      gameOver = true;
   }, gameDuration);

   let startCoundown = setInterval(() => {
      let mole = document.querySelectorAll(".back-row");
      let activateSkin = Math.floor(Math.random() * 2);
      console.log(activateSkin);
      countdown--;
      countdownText.textContent = countdown;
      if (activateSkin == 1) {
         mole.forEach((item) => {
            item.classList.toggle("skin");
         });
         setTimeout(() => {
            mole.forEach((item) => {
               item.classList.toggle("skin");
            });
         }, 800);
      }
      if (countdown < 0) {
         countdown = 0;
         countdownText.textContent = "Good Job, can you do better?";
         clearInterval(startCoundown);
      }
   }, 1000);
}

startButton.addEventListener("click", startGame);

function smash(e) {
   if (this.classList.contains("skin")) {
      gameScore += 5;
   } else {
      gameScore++;
   }

   this.classList.toggle("smashed");
   this.style.pointerEvents = "none";
   setTimeout(() => {
      this.classList.toggle("smashed");
      this.style.pointerEvents = "all";
   }, 800);
   scoreText.textContent = "Score: " + gameScore;
   if (bestScore === null) {
      localStorage.setItem("best-score", gameScore);
      bestScoreText.textContent = "0";
   } else {
      if (bestScore < gameScore) {
         localStorage.setItem("best-score", gameScore);
      }
   }
   bestScoreText.textContent =
      "All time best: " + localStorage.getItem("best-score");
}

characters.forEach((mole) => mole.addEventListener("click", smash));
