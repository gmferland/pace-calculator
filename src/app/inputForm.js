import { saveState, setUrlQueryParams } from './storage';
import { convertToSeconds, getFormattedSplits } from '../common/calculation';
import { displayResult, setErrorLabel } from '../common/domManipulation';

export function initializeInput() {
  const form = document.getElementById('input-form');
  const inputRace = document.getElementById('race');
  const inputTime = document.getElementById('time');

  // Configure event listeners
  inputTime.onfocus = function() {
    setErrorLabel(false);
  };

  form.onsubmit = function(e) {
    e.preventDefault();
    updateSplits();
  };

  inputTime.onkeypress = function() {
    setErrorLabel(false);
  };

  inputRace.onchange = function() {
    setErrorLabel(false);
  };
}

export function updateSplits() {
  try {
    const input = getAndValidateInput();
    const seconds = convertToSeconds(input.time);
    const splits = getFormattedSplits(seconds, input.distance);
    displayResult(splits);
    saveState(input.time, input.distance, splits);
    setUrlQueryParams(input.distance, input.time);
  } catch (error) {
    setErrorLabel(true, error);
  }
}

function getAndValidateInput() {
  const inputRace = document.getElementById('race');
  const inputUnit = document.querySelector('input[name=unit]:checked');
  const inputTime = document.getElementById('time');

  if (!inputRace.value) {
    throw new Error('Please enter a race distance.');
  }

  // Todo: logic for unit conversion
  /*   if (!inputUnit || !inputUnit.value) {
    throw new Error('Please select a distance unit.');
  } */

  if (!inputTime.value) {
    throw new Error('Please enter a race time.');
  }

  return {
    distance: inputRace.value,
    /* unit: inputUnit.value, */
    time: inputTime.value,
  };
}
