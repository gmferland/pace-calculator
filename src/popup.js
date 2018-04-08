const races = [
  {
    race: 'Mile',
    distance: 1609,
  },
  {
    race: '2 Mile',
    distance: 3218,
  },
  {
    race: '3k',
    distance: 3000,
  },
  {
    race: '5k',
    distance: 5000,
  },
  {
    race: '10k',
    distance: 10000,
  },
  {
    race: '15k',
    distance: 15000,
  },
  {
    race: '20k',
    distance: 20000,
  },
  {
    race: 'Half Marathon',
    distance: 21097.5,
  },
  {
    race: 'Marathon',
    distance: 42195,
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

document.onload = chrome.storage.local.get(['paceCalculator'], function(
  result,
) {
  if (result.paceCalculator.time) {
    inputTime.setAttribute('value', result.paceCalculator.time);
    selectEvent.selectedIndex = result.paceCalculator.raceIndex;
    displayResult(result.paceCalculator.splits);
  }
});

document.addEventListener('beforeunload');

function updateSplits(event) {
  try {
    const seconds = convertToSeconds(inputTime.value);
    const splits = calculateSplits(seconds, getSelectedDistance());
    displayResult(formatSplits(splits));
    // save state
    chrome.storage.local.set({
      paceCalculator: {
        time: inputTime.value,
        raceIndex: selectEvent.selectedIndex,
        splits: formatSplits(splits),
      },
    });
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
    if (current.match(/[^0-9\.]/)) {
      throw new Error('Time must only contain positive numbers');
    }
    return seconds + Number(current) * Math.pow(60, tokens.length - 1 - index);
  }, 0);
}

// calculate intermediate splits for the given distance (m) and time (s)
function calculateSplits(time, raceDistance) {
  const splits = [
    { race: '1k', time: Math.round(time * 1000 / raceDistance) },
    { race: 'Mile', time: Math.round(time * 1609 / raceDistance) },
  ];

  if (raceDistance > 3000) {
    splits.push({
      race: '3k',
      time: Math.round(time * 3000 / raceDistance),
    });
  }

  if (raceDistance > 5000) {
    splits.push({
      race: '5k',
      time: Math.round(time * 5000 / raceDistance),
    });
  }

  if (raceDistance > 10000) {
    splits.push({
      race: '10k',
      time: Math.round(time * 10000 / raceDistance),
    });
  }

  return splits;
}

// convert a number in seconds to a time duration
function convertToDuration(duration) {
  const durationBuilder = [];

  while (duration > 0) {
    const hours = Math.floor(duration / 3600);
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration);
    if (hours >= 1) {
      durationBuilder.push(String(hours));
      duration = duration - hours * 3600;
      if (duration === 0) {
        durationBuilder.push('00', '00');
      }
    } else if (minutes >= 1) {
      if (durationBuilder.length > 0) {
        // only want the leading zero on minutes if there are hours as well
        minutes = String(minutes).padStart(2, '0');
      }
      durationBuilder.push(minutes);
      duration = duration - minutes * 60;
      if (duration === 0) {
        durationBuilder.push('00');
      }
    } else {
      if (durationBuilder.length > 0) {
        // only want the leading zero on seconds if there are minutes as well
        seconds = String(seconds).padStart(2, '0');
      }
      durationBuilder.push(seconds);
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
  const splitsTable = document.getElementById('splits-table');
  // clear old results
  while (splitsTable.lastChild) {
    splitsTable.removeChild(splitsTable.lastChild);
  }
  // display new results
  splits.forEach(function(split) {
    const row = createRowForSplit(split);
    splitsTable.appendChild(row);
  });
  // show title
  const title = document.getElementById('splits-table-title');
  if (title.classList.contains('hidden')) {
    title.classList.remove('hidden');
  }
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
