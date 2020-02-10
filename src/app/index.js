import * as config from '../common/config';
import { convertToSeconds, getFormattedSplits } from '../common/calculation';
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
    const splits = getFormattedSplits(seconds, getSelectedRaceName());
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

function setErrorLabel(visibility, labelText) {
  const errorLabel = document.getElementById('error-label');
  errorLabel.innerHTML = labelText;
  if (visibility) {
    errorLabel.classList.remove('hidden');
  } else {
    errorLabel.classList.add('hidden');
  }
}

// get the value of the selected race in the dropdown
function getSelectedRaceName() {
  return selectRace.options[selectRace.selectedIndex].value;
}

// update the dom to show a list of the calculated splits
function displayResult(splits) {
  const splitsTable = document.getElementById('splits-table');
  const title = document.getElementById('splits-table-title');
  // clear old results
  while (splitsTable.lastChild) {
    splitsTable.removeChild(splitsTable.lastChild);
  }
  if (splits) {
    // display new results
    splits.forEach(function(split) {
      const row = createRowForSplit(split);
      splitsTable.appendChild(row);
    });
    // show title
    if (title.classList.contains('hidden')) {
      title.classList.remove('hidden');
    }
  } else {
    // hide title
    if (!title.classList.contains('hidden')) {
      title.classList.add('hidden');
    }
  }
}

function createRowForSplit(split) {
  const raceLabel = document.createElement('b');
  raceLabel.innerHTML = split.race + ':';

  const timeLabel = document.createElement('span');
  timeLabel.classList.add('time-label');
  timeLabel.innerHTML = split.time;

  const row = document.createElement('div');
  row.classList.add('pace-row');
  row.appendChild(raceLabel);
  row.appendChild(timeLabel);

  return row;
}
