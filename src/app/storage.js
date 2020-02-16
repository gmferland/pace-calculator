import { raceOptions } from '../common/config';
import { getDistanceAndUnitValue } from '../common/calculation';

const storageKey = 'savedSplits';

/**
 * Save state to local storage.
 * @param {string} distance A distance input value.
 * @param {string} unitId The unit of measurement of the distance.
 * @param {string} duration A duration (hh:mm:ss).
 */
export function saveState(distance, unitId, duration) {
  const storageItem = JSON.stringify({ distance, unitId, duration });
  window.localStorage.setItem(storageKey, storageItem);
}

/**
 * Load saved state from local storage.
 * @returns {{ distance: string, unit: string, time: string }} A triplet of values to prime the form inputs.
 */
export function loadState() {
  const storedItem = window.localStorage.getItem(storageKey);
  const savedState = JSON.parse(storedItem);

  if (savedState) {
    return {
      distance: savedState.distance,
      unit: savedState.unitId,
      time: savedState.duration,
    };
  }

  return null;
}

export function setUrlQueryParams(distance, unitId, duration) {
  const location = window.location.href;
  const url = new URL(location);
  if (url.searchParams.get('distance')) {
    url.searchParams.set('distance', distance);
    url.searchParams.set('time', duration);
    if (unitId) {
      url.searchParams.set('unit', unitId);
    }
  } else {
    url.searchParams.append('distance', distance);
    url.searchParams.append('time', duration);
    if (unitId) {
      url.searchParams.append('unit', unitId);
    }
  }

  window.history.replaceState({}, '', url.toJSON());
}

export function parseUrlQueryParams() {
  const url = new URL(window.location.href);
  const distance = url.searchParams.get('distance');
  const time = url.searchParams.get('time');
  const unit = url.searchParams.get('unit');
  if (distance && time) {
    return {
      distance,
      unit,
      time,
    };
  }
  return null;
}
