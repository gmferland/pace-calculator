import { disableUnitInput, initializeInput, updateSplits } from './inputForm';
import { loadState, parseUrlQueryParams } from './storage';
import { highlightLabelForChecked } from '../common/domManipulation';
import './styles.scss';
import './font/style.css';

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
        highlightLabelForChecked(unitInput);
      }
    } else {
      const unitInputGroup = document.getElementsByClassName('input-unit');
      if (unitInputGroup && unitInputGroup.length > 0) {
        disableUnitInput(unitInputGroup);
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
