import { saveState, setUrlQueryParams } from './storage';
import * as config from '../common/config';
import { convertToSeconds, getFormattedSplits } from '../common/calculation';
import {
  displayResult,
  getSelectedRaceName,
  setErrorLabel,
} from '../common/domManipulation';

const form = document.getElementById('input-form');
const selectRace = document.getElementById('race');
const inputTime = document.getElementById('time');

export function initializeInput() {
  // Populate the dropdown menu with configured race distances
  config.raceOptions.forEach(function(r) {
    const child = document.createElement('option');
    child.setAttribute('value', r.race);
    child.innerHTML = r.race;
    selectRace.appendChild(child);
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

  selectRace.onchange = function() {
    setErrorLabel(false);
  };
}

export function updateSplits() {
  try {
    const seconds = convertToSeconds(inputTime.value);
    const splits = getFormattedSplits(seconds, getSelectedRaceName(selectRace));
    displayResult(splits);
    saveState(inputTime.value, selectRace.selectedIndex, splits);
    setUrlQueryParams(selectRace.selectedIndex, inputTime.value);
  } catch (error) {
    setErrorLabel(true, error);
  }
}
