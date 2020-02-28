import { initializeInput, updateSplits } from './inputForm';
import { disableUnitInput } from '../common/domManipulation';
import { loadState, parseUrlQueryParams, setMetaTags } from './storage';
import './styles.scss';
import './font/style.css';

window.onload = function() {
  initializeInput();
  const selectRace = document.getElementById('race');
  const inputTime = document.getElementById('time');
  const stateFromUrl = parseUrlQueryParams();
  if (stateFromUrl) {
    setMetaTags();
    inputTime.setAttribute('value', stateFromUrl.time);
    selectRace.setAttribute('value', stateFromUrl.distance);
    if (stateFromUrl.unit) {
      const unitInput = document.querySelector(
        `input[name=unit][value="${stateFromUrl.unit}"]`
      );
      if (unitInput) {
        unitInput.setAttribute('checked', true);
      }
    } else {
      disableUnitInput();
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
