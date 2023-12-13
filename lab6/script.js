const ballEl = document.querySelector('#ball');
const wrapper = document.querySelector('#wrapper');
const startButton = document.querySelector('#start');
const holes = [];
let isGameRunning = false;
let score = 0;
let positionX = 20;
let positionY = 20;
let speedX = 0;
let speedY = 0;
const getNumericValue = (element, isPositionLeft = false) => {
  return parseFloat(element.style[isPositionLeft ? 'left' : 'top'].slice(0, -2))
}

const createHoles = () => {
  for (let i = 2; i < (window.innerWidth / 100); i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.style.left = `${100 * i + Math.random() * 75 - 95}px`;
    hole.style.top = `${(Math.random() * window.innerHeight - 95) / 2}px`;
    holes.push(hole);
    wrapper.appendChild(hole);
  }

  for (let i = 2; i < (window.innerWidth / 100); i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.style.left = `${100 * i + Math.random() * 75 - 95}px`;
    hole.style.top = `${Math.random() * (window.innerHeight / 2) + window.innerHeight / 2 - 100}px`;
    holes.push(hole);
    wrapper.appendChild(hole);
  }
  checkHoles();
  randomizeCorrectHole(1);
}

const randomizeCorrectHole = (index) => {
  let correctHole = Math.floor(Math.random() * holes.length);
  if (correctHole === index && index < holes.length) {
    index++;
  } else {
    index--;
  }
  holes[correctHole].classList.remove("hole");
  holes[correctHole].classList.add("correctHole")
}

const orientationChange = (e) => {
  speedX = e.gamma / 45;
  console.log(speedX);
  speedY = e.beta / 45;
}

const moveBall = () => {
  if (positionX + speedX < window.innerWidth - 50 && positionX + speedX > 0) {
    positionX += speedX;
    ballEl.style.left = `${positionX}px`;
  }

  if (positionY + speedY < window.innerHeight - 50 && positionY + speedY > 0) {
    positionY += speedY;
    ballEl.style.top = `${positionY}px`;
  }

  for (let i = 0; i < holes.length; i++) {
    const topPosition = getNumericValue(holes[i]);
    const leftPosition = getNumericValue(holes[i], true);
    console.log(topPosition, leftPosition)
    if (positionY < Math.floor(topPosition) + 50 && positionY > topPosition) {
      if (positionX > leftPosition && positionX < Math.floor(leftPosition) + 50) {
        if (holes[i].classList.contains('correctHole')) {
          holes[i].classList.remove('correctHole');
          holes.forEach(element => {
            if (element.classList.contains("temporaryHole")) {
              element.classList.remove("temporaryHole");
              element.classList.add("hole");
            }
          })
          holes[i].classList.add("temporaryHole");
          score++;
          randomizeCorrectHole(i);
        } else if (holes[i].classList.contains('hole')) {
          isGameRunning = false;
          let yourScore = window.prompt(`zdobyłeś ${score} punktów`);
          document.querySelector('#restart').hidden = false;
        }
      }
    }
  }

  if (isGameRunning === true) {
    window.requestAnimationFrame(moveBall);
  }
}

const checkHoles = () => {
  for (let i = 0; i < holes.length; i++) {
    for (j = i + 1; j < holes.length; j++) {
      if (
        getNumericValue(holes[j], true) > getNumericValue(holes[i], true) + 75 &&
        getNumericValue(holes[j]) > getNumericValue(holes[i]) + 75
      ) {
        holes[j].style.top = `${getNumericValue(holes[j]) + 50}px`;
        holes[j].style.left = `${getNumericValue(holes[j], true) + 50}px`;
      }

    }
  }
}

const startGame = () => {
  isGameRunning = true;
  createHoles();
  moveBall();
}

startButton.addEventListener('click', startGame);
window.addEventListener('deviceorientation', orientationChange);