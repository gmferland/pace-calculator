import { saveState, setUrlQueryParams } from './storage';
import * as config from '../common/config';
import { convertToSeconds, getFormattedSplits } from '../common/calculation';
import {
  displayResult,
  getSelectedRaceName,
  setErrorLabel,
} from '../common/domManipulation';

const form = document.getElementById('input-form');
const inputRace = document.getElementById('race');
const raceOptions = document.getElementById('race-options');
const inputTime = document.getElementById('time');

export function initializeInput() {
  // Populate the dropdown menu with configured race distances
  config.raceOptions.forEach(function(r) {
    const child = document.createElement('option');
    child.setAttribute('value', r.race);
    child.innerHTML = r.race;
    raceOptions.appendChild(child);
  });

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
    const splits = getFormattedSplits(seconds, getSelectedRaceName(inputRace));
    displayResult(splits);
    saveState(inputTime.value, inputRace.selectedIndex, splits);
    setUrlQueryParams(inputRace.selectedIndex, inputTime.value);
  } catch (error) {
    setErrorLabel(true, error);
  }
}
