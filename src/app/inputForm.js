import { saveState, setUrlQueryParams } from './storage';
import { convertToSeconds, getFormattedSplits } from '../common/calculation';
import { displayResult, setErrorLabel } from '../common/domManipulation';

const form = document.getElementById('input-form');
const inputRace = document.getElementById('race');
const inputTime = document.getElementById('time');

export function initializeInput() {
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
    const seconds = convertToSeconds(inputTime.value);
    const splits = getFormattedSplits(seconds, inputRace.value);
    displayResult(splits);
    saveState(inputTime.value, inputRace.value, splits);
    setUrlQueryParams(inputRace.value, inputTime.value);
  } catch (error) {
    setErrorLabel(true, error);
  }
}
