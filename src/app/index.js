import { initializeInput, updateSplits } from './inputForm';
import { loadState, parseUrlQueryParams } from './storage';
import { displayResult } from '../common/domManipulation';
import './styles.scss';

window.onload = function() {
  initializeInput();
  const selectRace = document.getElementById('race');
  const inputTime = document.getElementById('time');
  const stateFromUrl = parseUrlQueryParams();
  if (stateFromUrl) {
    inputTime.setAttribute('value', stateFromUrl.time);
    selectRace.setAttribute('value', stateFromUrl.race);
    updateSplits();
  }
  const savedSplits = loadState();
  if (savedSplits) {
    inputTime.setAttribute('value', savedSplits.time);
    selectRace.setAttribute('value', savedSplits.race);
    displayResult(savedSplits.splits);
  }
};
