const ballEl = document.querySelector('#ball');
const wrapper = document.querySelector('#wrapper');
const startButton = document.querySelector('#start');
const restartButton = document.querySelector('#restart');
let holeEl;
let isGameRunning = false;
let score = 0;
let positionX = 20;
let positionY = 20;
let speedX = 0;
let speedY = 0;

const endGame = () => {
  isGameRunning = false;
  window.alert(Zdobyte punkty: ${score});
  clearTimeout(endGame);
}

const getNumericValue = (element, isPositionLeft = false) => {
  return parseFloat(element.style[isPositionLeft ? 'left' : 'top'].slice(0, -2))
}

const createNewHole = () => {
  const hole = document.createElement('div');
  hole.classList.add('correctHole');
  hole.style.left = ${100 + Math.random() * 75 - 95}px;
  hole.style.top = ${(Math.random() * window.innerHeight - 95) / 2}px;
  wrapper.appendChild(hole);
  holeEl = document.querySelector('.correctHole');
}

const orientationChange = (e) => {
  speedX = e.gamma / 45;
  speedY = e.beta / 45;
}

const moveBall = () => {
  if (!isGameRunning) {
    speedX = 0;
    speedY = 0;
    return;
  }
  if (positionX + speedX < window.innerWidth - 50 && positionX + speedX > 0) {
    positionX += speedX;
    ballEl.style.left = ${positionX}px;
  }

  if (positionY + speedY < window.innerHeight - 50 && positionY + speedY > 0) {
    positionY += speedY;
    ballEl.style.top = ${positionY}px;
  }


  const topPosition = getNumericValue(holeEl);
  const leftPosition = getNumericValue(holeEl, true);
  if (positionY < Math.floor(topPosition) + 50 && positionY > topPosition) {
    if (positionX > leftPosition && positionX < Math.floor(leftPosition) + 50) {
      holeEl.remove();
      score++;
      createNewHole();
    }
  }

  if (isGameRunning === true) {
    window.requestAnimationFrame(moveBall);
  }
}

const startGame = () => {
  setTimeout(endGame, 5_000);
  isGameRunning = true;
  createNewHole();
  moveBall();
}

startButton.addEventListener('click', () => {
  if (!isGameRunning) {
    startGame()
  }
});

restartButton.addEventListener('click', () => {
  clearTimeout(endGame);
  setTimeout(endGame, 5_000);
  score = 0;
  holeEl.remove();
  createNewHole();
  isGameRunning = true;
  moveBall();
})

window.addEventListener('deviceorientation', orientationChange);