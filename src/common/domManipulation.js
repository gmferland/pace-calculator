/**
 * Update the dom to show a list of the calculated splits
 * @param {Array<{ name: string, time: string }>} splits A list of split objects.
 * @returns {void}
 */
export function displayResult(splits) {
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

/**
 * Display an error message, or hide an existing error message.
 * @param {boolean} visibility Whether the error label should be visible.
 * @param {string} labelText The error message to show.
 * @returns {void}
 */
export function setErrorLabel(visibility, labelText) {
  const errorLabel = document.getElementById('error-label');
  errorLabel.innerHTML = labelText;
  if (visibility) {
    errorLabel.classList.remove('hidden');
  } else {
    errorLabel.classList.add('hidden');
  }
}

/**
 * Create a DOM element containing the details of the split object.
 * @param {{ name: string, time: string }} split A split object.
 * @returns {HTMLElement} A DOM element.
 */
function createRowForSplit(split) {
  const raceLabel = document.createElement('b');
  raceLabel.innerHTML = split.name + ':';

  const timeLabel = document.createElement('span');
  timeLabel.classList.add('time-label');
  timeLabel.innerHTML = split.time;

  const row = document.createElement('div');
  row.classList.add('pace-row');
  row.appendChild(raceLabel);
  row.appendChild(timeLabel);

  return row;
}
