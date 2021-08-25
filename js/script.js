const spots = document.querySelectorAll(".hole");
const scoreText = document.querySelector(".game-score");
const characters = document.querySelectorAll(".mole");
const countdownText = document.querySelector(".countdown");
const startButton = document.querySelector(".start-button");
let lastHole;
let gameOver = false;
let gameDuration = 30000;
let gameScore = 0;
let countdown;
let holesLengh = spots.length;

function reset() {
   countdownText.style.top = "9%";
   countdownText.style.right = "5%";
   countdownText.style.color = "rgb(1, 47, 117)";
}

function pickRandomHole(holes) {
   const randomHole = Math.floor(Math.random() * holesLengh);
   const hole = holes[randomHole];
   if (hole === lastHole) {
      return pickRandomHole(holes);
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
   reset();
   countdown = gameDuration / 1000;
   scoreText.textContent = 0;
   scoreText.style.display = "block";
   countdownText.textContent = countdown;
   gameOver = false;
   gameScore = 0;
   popOut();
   setTimeout(() => {
      gameOver = true;
   }, gameDuration);

   let startCoundown = setInterval(() => {
      countdown--;
      countdownText.textContent = countdown;
      if (countdown < 0) {
         countdown = 0;
         countdownText.textContent = "Good Job, can you do better?";
         countdownText.style.top = "50%";
         countdownText.style.right = "8%";
         countdownText.style.color = "white";
         clearInterval(startCoundown);
      }
   }, 1000);
}

startButton.addEventListener("click", startGame);

function smash(e) {
   gameScore++;
   this.style.backgroundImage = "url('../images/smashed.png')";
   this.style.pointerEvents = "none";
   setTimeout(() => {
      this.style.backgroundImage = "url('../images/character.png')";
      this.style.pointerEvents = "all";
   }, 800);
   scoreText.textContent = gameScore;
}

characters.forEach((mole) => mole.addEventListener("click", smash));
