import { initializeInput, updateSplits } from './inputForm';
import { loadState, parseUrlQueryParams } from './storage';
import { displayResult } from '../common/domManipulation';
import './styles.scss';
import './font/style.css';

window.onload = function() {
  initializeInput();
  const selectRace = document.getElementById('race');
  const inputTime = document.getElementById('time');
  const stateFromUrl = parseUrlQueryParams();
  if (stateFromUrl) {
    inputTime.setAttribute('value', stateFromUrl.time);
    selectRace.selectedIndex = stateFromUrl.raceIndex;
    updateSplits();
  }
  const savedSplits = loadState();
  if (savedSplits && savedSplits.time) {
    inputTime.setAttribute('value', savedSplits.time);
    selectRace.selectedIndex = savedSplits.raceIndex;
    displayResult(savedSplits.splits);
  }
};
