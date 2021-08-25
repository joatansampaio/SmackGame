const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".start-button");

let lastHole;
let timeUp = false;
let timeLimit = 30000;
let score = 0;
let countdown;
let holesLengh = holes.length;

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
   const hole = pickRandomHole(holes);
   hole.classList.toggle("up");
   setTimeout(function () {
      hole.classList.toggle("up");
      if (!timeUp) popOut();
   }, time);
}

function startGame() {
   countdown = timeLimit / 1000;
   scoreBoard.textContent = 0;
   scoreBoard.style.display = "block";
   countdownBoard.textContent = countdown;
   timeUp = false;
   score = 0;
   popOut();
   setTimeout(() => {
      timeUp = true;
   }, timeLimit);

   let startCoundown = setInterval(() => {
      countdown = 30;
      countdownBoard.textContent = countdown;
      if (countdown < 0) {
         countdown = 0;
         clearInterval(startCoundown);
         countdownBoard.textContent("That's it, try again!");
      }
   }, 1000);
}

startButton.addEventListener("click", startGame);

function whack(e) {
   score++;
   this.style.backgroundImage = "url(../images/smashed.png)";
   this.style.pointerEvents = "none";
   setTimeout(() => {
      this.style.backgroundImage = "url(../images/character.png)";
      this.style.pointerEvents = "all";
   }, 800);
   scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", whack));
