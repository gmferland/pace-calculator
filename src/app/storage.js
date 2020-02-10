const storageKey = 'savedSplits';

export function saveState(time, raceIndex, splits) {
  const storageItem = JSON.stringify({ time, raceIndex, splits });
  window.localStorage.setItem(storageKey, storageItem);
}

export function loadState() {
  const savedSplits = window.localStorage.getItem('savedSplits');
  return JSON.parse(savedSplits);
}

export function setUrlQueryParams(raceIndex, time) {
  const location = window.location.href;
  const url = new URL(location);
  if (url.searchParams.get('race')) {
    url.searchParams.set('race', raceIndex);
    url.searchParams.set('time', time);
  } else {
    url.searchParams.append('race', raceIndex);
    url.searchParams.append('time', time);
  }

  window.history.replaceState({}, '', url.toJSON());
}

export function parseUrlQueryParams() {
  const url = new URL(window.location.href);
  const raceIndex = url.searchParams.get('race');
  const time = url.searchParams.get('time');
  if (raceIndex && time) {
    return {
      raceIndex,
      time,
    };
  }
  return null;
}
