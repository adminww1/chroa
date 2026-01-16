const chicken = document.getElementById("chicken");
const multipliers = document.querySelectorAll(".multiplier-circle");
const winPopup = document.getElementById("winPopup");
const playButton = document.querySelector(".play-btn");
const jumpSound = document.getElementById("jumpSound");
const timerDisplay = document.getElementById("timerDisplay");

const platformMultipliers = [
  1.03, 1.07, 1.12, 1.17, 1.23, 1.29, 1.36, 1.44, 1.53, 1.63,
  1.75, 1.88, 2.04, 2.22, 2.45, 2.72, 3.06, 3.5, 4.08, 4.9,
  6.13, 9.81, 19.44
];

const levels = ["Лёгкий", "Средний", "Сложный"];

let gameInProgress = false;
let canPlay = true;

function getRandomLevel() {
  return levels[Math.floor(Math.random() * levels.length)];
}

function startGame() {
  if (gameInProgress || !canPlay) return;

  canPlay = false;
  gameInProgress = true;

  playButton.disabled = true;
  playButton.style.opacity = "0.6";

  let timeLeft = 10;
  timerDisplay.textContent = "Wait: " + timeLeft + " seconds";

  const timer = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      timerDisplay.textContent = "Wait: " + timeLeft + " seconds";
    } else {
      clearInterval(timer);
      timerDisplay.textContent = "";
      playButton.disabled = false;
      playButton.style.opacity = "1";
      canPlay = true;
    }
  }, 1000);

  const randomIndex = Math.floor(Math.random() * multipliers.length);
  const selectedCircle = multipliers[randomIndex];
  const multiplier = platformMultipliers[randomIndex];
  const level = getRandomLevel();

  multipliers.forEach(el => {
    el.style.backgroundColor = "rgba(255,255,255,0.2)";
  });

  selectedCircle.style.backgroundColor = "rgba(255,255,255,0.5)";

  chicken.style.left = selectedCircle.offsetLeft + "px";
  chicken.style.transform = "translateY(-100px)";
  jumpSound.play();

  setTimeout(() => {
    chicken.style.transform = "translateY(0)";
    showWinPopup(multiplier, level);
  }, 500);

  document.querySelector(".scroll-container").scrollTo({
    left: selectedCircle.offsetLeft - 200,
    behavior: "smooth"
  });
}

function showWinPopup(multiplier, level) {
  const popup = document.querySelector(".win-popup");
  const winSound = document.getElementById("winSound");

  popup.querySelector(".multiplier").textContent = "x" + multiplier;
  popup.querySelector(".level").textContent = level;

  popup.style.display = "block";
  popup.classList.add("shake");

  winSound.currentTime = 0;
  winSound.play();

  setTimeout(() => {
    popup.style.display = "none";
    popup.classList.remove("shake");
    gameInProgress = false;
  }, 3000);
}
