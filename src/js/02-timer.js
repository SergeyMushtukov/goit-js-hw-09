import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const dateInput = flatpickr('#datetime-picker', options);
dateInput.config.onClose.push(validateInputDate);

const buttonStartEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

setDisabledEl(buttonStartEl);

buttonStartEl.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  setDisabledEl(buttonStartEl);
  const targetDate = dateInput.selectedDates[0];
  if (targetDate <= Date.now()) {
    Notify.failure('Date out of date, please choose a date in the future');
    return;
  }
  const timerId = setInterval(() => {
    const delta = targetDate - Date.now();
    if (delta <= 0) {
      clearInterval(timerId);
      return;
    }
    const convertedDelta = convertMs(delta);
    updateCounter(convertedDelta);
  }, 1000);
}

function updateCounter({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function validateInputDate(selectedDates) {
  if (selectedDates[0] <= Date.now()) {
    Notify.failure('Please choose a date in the future');
    setDisabledEl(buttonStartEl);
    return;
  }
  setEnabledEl(buttonStartEl);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setDisabledEl(element) {
  element.setAttribute('disabled', ' ');
}

function setEnabledEl(element) {
  element.removeAttribute('disabled');
}
