const storageKey = 'savedSplits';

export function saveState(time, race, splits) {
  const storageItem = JSON.stringify({ time, race, splits });
  window.localStorage.setItem(storageKey, storageItem);
}

export function loadState() {
  const savedSplits = window.localStorage.getItem('savedSplits');
  return JSON.parse(savedSplits);
}

export function setUrlQueryParams(race, time) {
  const location = window.location.href;
  const url = new URL(location);
  if (url.searchParams.get('race')) {
    url.searchParams.set('race', race);
    url.searchParams.set('time', time);
  } else {
    url.searchParams.append('race', race);
    url.searchParams.append('time', time);
  }

  window.history.replaceState({}, '', url.toJSON());
}

export function parseUrlQueryParams() {
  const url = new URL(window.location.href);
  const race = url.searchParams.get('race');
  const time = url.searchParams.get('time');
  if (race && time) {
    return {
      race,
      time,
    };
  }
  return null;
}
