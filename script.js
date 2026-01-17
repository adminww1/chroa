const chicken = document.getElementById("chicken");
const multipliers = document.querySelectorAll(".multiplier-circle");
const playButton = document.querySelector(".play-btn");
const jumpSound = document.getElementById("jumpSound");
const timerDisplay = document.getElementById("timerDisplay");

const levels = ["Лёгкий", "Средний", "Сложный"];

const multipliersByLevel = {
  "Лёгкий": [
    1.12, 1.17, 1.23, 1.29, 1.36, 1.44, 1.53, 1.63,
    1.75, 1.88, 2.04, 2.22, 2.45, 2.72, 3.06, 3.50,
    4.08, 4.90, 6.13, 6.61, 9.81, 19.44
  ],
  "Средний": [
    1.47, 1.70, 1.98, 2.33, 2.76, 3.32, 4.03,
    4.96, 6.20, 6.91, 8.90, 11.74, 15.99
  ],
  "Сложный": [
    1.55, 1.98, 2.56, 3.36, 4.49,
    5.49, 7.53, 10.56, 15.21, 22.59, 34.79
  ]
};

let gameInProgress = false;
let canPlay = true;

function getRandomLevel() {
  return levels[Math.floor(Math.random() * levels.length)];
}

// 🔹 поиск ближайшего круга
function getClosestCircle(multiplier) {
  let closest = null;
  let minDiff = Infinity;

  multipliers.forEach(circle => {
    const value = parseFloat(circle.textContent);
    const diff = Math.abs(value - multiplier);

    if (diff < minDiff) {
      minDiff = diff;
      closest = circle;
    }
  });

  return closest;
}

function startGame() {
  if (gameInProgress || !canPlay) return;

  gameInProgress = true;
  canPlay = false;

  playButton.disabled = true;
  playButton.style.opacity = "0.6";

  let timeLeft = 10;
  timerDisplay.textContent = `Wait: ${timeLeft} seconds`;

  const timer = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      timerDisplay.textContent = `Wait: ${timeLeft} seconds`;
    } else {
      clearInterval(timer);
      timerDisplay.textContent = "";
      playButton.disabled = false;
      playButton.style.opacity = "1";
      canPlay = true;
    }
  }, 1000);

  const level = getRandomLevel();
  const levelMultipliers = multipliersByLevel[level];
  const multiplier =
    levelMultipliers[Math.floor(Math.random() * levelMultipliers.length)];

  const selectedCircle = getClosestCircle(multiplier);

  multipliers.forEach(el => {
    el.style.backgroundColor = "rgba(255,255,255,0.2)";
  });

  selectedCircle.style.backgroundColor = "rgba(255,255,255,0.5)";

  chicken.style.left = selectedCircle.offsetLeft + "px";
  chicken.style.transform = "translateY(-100px)";
  jumpSound.currentTime = 0;
  jumpSound.play();

  document.querySelector(".scroll-container").scrollTo({
    left: selectedCircle.offsetLeft - 200,
    behavior: "smooth"
  });

  setTimeout(() => {
    chicken.style.transform = "translateY(0)";
    showWinPopup(multiplier, level);
  }, 500);
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
