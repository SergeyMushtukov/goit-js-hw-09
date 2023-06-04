const bodyEl = document.querySelector('body');
const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');

buttonStartEl.addEventListener('click', onStartClick);
buttonStopEl.addEventListener('click', onStopClick);

setDisabledEl(buttonStopEl);

let timerId = null;

function onStartClick() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  setDisabledEl(buttonStartEl);
  setEnabledEl(buttonStopEl);
}

function onStopClick() {
  clearInterval(timerId);
  setDisabledEl(buttonStopEl);
  setEnabledEl(buttonStartEl);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function setDisabledEl(element) {
  element.setAttribute('disabled', ' ');
}

function setEnabledEl(element) {
  element.removeAttribute('disabled');
}
