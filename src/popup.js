const races = [
  {
    name: 'Mile',
    distance: 1609,
  },
  {
    name: '5k',
    distance: 5000,
  },
  {
    name: '10k',
    distance: 10000,
  },
];

const selectEvent = document.getElementById('event');
const inputTime = document.getElementById('time');

races.forEach(function(r) {
  const child = document.createElement('option');
  child.setAttribute('value', r.name);
  child.innerHTML = r.name;
  selectEvent.appendChild(child);
});

inputTime.onblur = updateSplits;
inputTime.onfocus = function() {
  setErrorLabel(false);
};
inputTime.onkeypress = function(e) {
  switch (e.key) {
    case 'Enter':
    case 'Tab':
      updateSplits();
    default:
      setErrorLabel(false);
  }
};
selectEvent.onchange = updateSplits;

function updateSplits(event) {
  try {
    const seconds = parseTime(event.target.value);
    const splits = calculateSplits(seconds, getSelectedDistance());
    displayResult(splits);
  } catch (error) {
    setErrorLabel(true, error);
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

// convert a string of the format (hh):mm:ss to a number in seconds
function parseTime(timeString) {
  throw new Error('Dev error!');
}

// match the value of the selected event in the dropdown to its distance in meters
function getSelectedDistance() {
  const raceName = selectEvent.options[selectEvent.selectedIndex].value;
  if (raceName === 'default') {
    return 0;
  }

  return races.find(function(r) {
    return r.name === raceName;
  }).distance;
}

// calculate intermediate splits for the given distance and time
function calculateSplits(time, raceDistance) {}

// update the dom to show a list of the calculated splits
function displayResult(splits) {}
