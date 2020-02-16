import { initializeInput, updateSplits } from './inputForm';
import { loadState, parseUrlQueryParams } from './storage';
import './styles.scss';

window.onload = function() {
  initializeInput();
  const selectRace = document.getElementById('race');
  const inputTime = document.getElementById('time');
  const stateFromUrl = parseUrlQueryParams();
  if (stateFromUrl) {
    inputTime.setAttribute('value', stateFromUrl.time);
    selectRace.setAttribute('value', stateFromUrl.distance);
    if (stateFromUrl.unit) {
      const unitInput = document.querySelector(
        `input[name=unit][value="${stateFromUrl.unit}"]`
      );
      if (unitInput) {
        unitInput.setAttribute('checked', true);
      }
    }
    updateSplits();
  } else {
    const savedSplits = loadState();
    if (savedSplits) {
      inputTime.setAttribute('value', savedSplits.time);
      selectRace.setAttribute('value', savedSplits.distance);
      if (savedSplits.unit) {
        const unitInput = document.querySelector(
          `input[name=unit][value="${savedSplits.unit}"]`
        );
        if (unitInput) {
          unitInput.setAttribute('checked', true);
        }
      }
      updateSplits();
    }
  }
};
