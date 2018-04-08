const races = [
  {
    race: 'Mile',
    distance: 1609,
  },
  {
    race: '5k',
    distance: 5000,
  },
  {
    race: '10k',
    distance: 10000,
  },
];

const selectEvent = document.getElementById('event');
const inputTime = document.getElementById('time');

races.forEach(function(r) {
  const child = document.createElement('option');
  child.setAttribute('value', r.race);
  child.innerHTML = r.race;
  selectEvent.appendChild(child);
});

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
    const seconds = convertToSeconds(inputTime.value);
    const splits = calculateSplits(seconds, getSelectedDistance());
    displayResult(formatSplits(splits));
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

// convert time duration (hh:mm:ss) to a number in seconds
function convertToSeconds(duration) {
  const tokens = duration.split(':');
  if (tokens.length > 3) {
    throw new Error('Please format time as hh:mm:ss or mm:ss');
  }

  return tokens.reduceRight(function(seconds, current, index) {
    if (current.match(/[^0-9]/)) {
      throw new Error('Time must only contain numbers');
    }
    return seconds + Number(current) * Math.pow(60, tokens.length - 1 - index);
  }, 0);
}

// calculate intermediate splits for the given distance (m) and time (s)
function calculateSplits(time, raceDistance) {
  return [{ race: 'Mile', time }];
}

// convert a number in seconds to a time duration
function convertToDuration(duration) {
  const durationBuilder = [];

  while (duration > 0) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60);
    if (hours >= 1) {
      durationBuilder.push(hours);
      duration = duration - hours * 3600;
    } else if (minutes >= 1) {
      durationBuilder.push(minutes);
      duration = duration - minutes * 60;
    } else {
      durationBuilder.push(duration);
      duration = 0;
    }
  }

  return durationBuilder.join(':');
}

// convert to duration for an array of split objects
function formatSplits(splits) {
  return splits.map(function(split) {
    return {
      race: split.race,
      time: convertToDuration(split.time),
    };
  });
}

// match the value of the selected event in the dropdown to its distance in meters
function getSelectedDistance() {
  const raceName = selectEvent.options[selectEvent.selectedIndex].value;
  if (raceName === 'default') {
    return 0;
  }

  return races.find(function(r) {
    return r.race === raceName;
  }).distance;
}

// update the dom to show a list of the calculated splits
function displayResult(splits) {
  splits.forEach(function(split) {
    const existingNode = document.getElementById(split.race);
    if (existingNode) {
      existingNode.innerHTML = split.time;
    } else {
      const row = createRowForSplit(split);
      const splitsTable = document.getElementById('splits-table');
      splitsTable.appendChild(row);
      if (splitsTable.classList.contains('hidden')) {
        splitsTable.classList.remove('hidden');
      }
    }
  });
}

function createRowForSplit(split) {
  const raceLabel = document.createElement('b');
  raceLabel.innerHTML = split.race + ':';

  const timeLabel = document.createElement('span');
  timeLabel.setAttribute('id', split.race);
  timeLabel.classList.add('time-label');
  timeLabel.innerHTML = split.time;

  const row = document.createElement('div');
  row.classList.add('pace-row');
  row.appendChild(raceLabel);
  row.appendChild(timeLabel);

  return row;
}
