import { saveState, setUrlQueryParams } from './storage';
import {
  convertToSeconds,
  getFormattedSplits,
  convertToMeters,
} from '../common/calculation';
import { raceOptions } from '../common/config';
import {
  displayResult,
  handleUnitInputChange,
  setErrorLabel,
} from '../common/domManipulation';

export function initializeInput() {
  const form = document.getElementById('input-form');
  const inputRace = document.getElementById('race');
  const inputTime = document.getElementById('time');
  const inputUnit = document.querySelectorAll('input[name=unit]');

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
    const unitInputGroup = document.getElementsByClassName('input-unit');
    if (unitInputGroup && unitInputGroup.length > 0) {
      enableUnitInput(unitInputGroup);
    }
  };

  inputRace.onblur = function(e) {
    const value = e.target.value;
    const unitInputGroup = document.getElementsByClassName('input-unit');
    if (!(unitInputGroup && unitInputGroup.length > 0)) {
      return;
    }
    if (
      raceOptions.some(function(race) {
        return race.name === value;
      })
    ) {
      if (!unitInputGroup[0].classList.contains('disabled')) {
        disableUnitInput(unitInputGroup);
      }
    } else {
      if (unitInputGroup[0].classList.contains('disabled')) {
        enableUnitInput(unitInputGroup);
      }
    }
  };

  inputUnit.forEach(function(unitInput) {
    unitInput.onchange = handleUnitInputChange(unitInput);
  });
}

export function updateSplits() {
  try {
    const input = getAndValidateInput();
    const seconds = convertToSeconds(input.time);
    const meters = convertToMeters(input.distance, input.unit);
    const splits = getFormattedSplits(meters, seconds);
    displayResult(splits);

    const distanceToSave = input.race || input.distance.toString();
    // Only save unit when distance is custom
    const unitToSave = input.race ? null : input.unit;
    saveState(distanceToSave, unitToSave, input.time);
    setUrlQueryParams(distanceToSave, unitToSave, input.time);
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

  // Check to see if the race input is configured or custom
  let distance;
  let unit;
  const matchingRace = raceOptions.find(function(race) {
    return race.name === inputRace.value;
  });
  if (matchingRace) {
    ({ distance, unit } = matchingRace);
  } else {
    // if custom, distance must be a number and unit is required
    if (!inputUnit || !inputUnit.value) {
      throw new Error('Please select a distance unit.');
    }
    distance = Number(inputRace.value);
    unit = inputUnit.value;
  }

  if (!inputTime.value) {
    throw new Error('Please enter a race time.');
  }

  return {
    distance,
    race: matchingRace && matchingRace.name,
    unit,
    time: inputTime.value,
  };
}

export function disableUnitInput(unitInputGroup) {
  const selectedUnit = document.querySelector('input[name=unit]:checked');
  if (selectedUnit) {
    selectedUnit.setAttribute('checked', false);
    const selectedUnitLabel = unitInputGroup[0].querySelector('label.checked');
    if (selectedUnitLabel) {
      selectedUnitLabel.classList.remove('checked');
    }
  }
  const allUnitInputs = document.querySelectorAll('input[name=unit]');
  allUnitInputs.forEach(function(unitInput) {
    unitInput.setAttribute('disabled', 'disabled');
  });
  unitInputGroup[0].classList.add('disabled');
}

function enableUnitInput(unitInputGroup) {
  const allUnitInputs = document.querySelectorAll('input[name=unit]');
  allUnitInputs.forEach(function(unitInput) {
    unitInput.removeAttribute('disabled');
  });
  unitInputGroup[0].classList.remove('disabled');
}
