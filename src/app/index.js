import * as config from '../common/config';
import { convertToSeconds, getFormattedSplits } from '../common/calculation';
import {
  displayResult,
  getSelectedRaceName,
  setErrorLabel,
} from '../common/domManipulation';
import './styles.scss';

const raceOptions = config.raceOptions;
const storageKey = 'savedSplits';
const selectRace = document.getElementById('race');
const inputTime = document.getElementById('time');

raceOptions.forEach(function(r) {
  const child = document.createElement('option');
  child.setAttribute('value', r.race);
  child.innerHTML = r.race;
  selectRace.appendChild(child);
});

inputTime.onfocus = function() {
  setErrorLabel(false);
};

inputTime.onkeypress = function(e) {
  switch (e.key) {
    case 'Enter':
    case 'Tab':
      updateSplits();
      break;
    default:
      setErrorLabel(false);
      break;
  }
};

selectRace.onfocus = function() {
  setErrorLabel(false);
};

window.onload = function() {
  loadState();
};

function updateSplits() {
  try {
    const seconds = convertToSeconds(inputTime.value);
    const splits = getFormattedSplits(seconds, getSelectedRaceName(selectRace));
    displayResult(splits);
    saveState(inputTime.value, selectRace.selectedIndex, splits);
  } catch (error) {
    setErrorLabel(true, error);
  }
}

function saveState(time, raceIndex, splits) {
  const storageItem = JSON.stringify({ time, raceIndex, splits });
  window.localStorage.setItem(storageKey, storageItem);
}

function loadState() {
  const savedSplitsString = window.localStorage.getItem('savedSplits');
  const savedSplits = JSON.parse(savedSplitsString);
  if (savedSplits && savedSplits.time) {
    inputTime.setAttribute('value', savedSplits.time);
    selectRace.selectedIndex = savedSplits.raceIndex;
    displayResult(savedSplits.splits);
  }
}
