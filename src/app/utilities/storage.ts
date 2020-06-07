import { parseUrlQueryParams, setUrlQueryParams } from './url';
import { Unit } from 'common/config';

const storageKey = 'savedSplits';

const saveToLocalStorage = (
  distance: string | number,
  unit: Unit,
  duration: string
) => {
  // Guard for SSR environment
  if (typeof window === 'undefined') {
    return;
  }
  const storageItem = JSON.stringify({ distance, unit, duration });
  window.localStorage.setItem(storageKey, storageItem);
};

const loadFromLocalStorage = () => {
  // Guard for SSR environment
  if (typeof window === 'undefined') {
    return;
  }

  const storedItem = window.localStorage.getItem(storageKey);
  if (storedItem) {
    const savedState = JSON.parse(storedItem);
    return {
      distance: savedState.distance,
      unit: savedState.unit,
      time: savedState.duration,
    };
  }

  return null;
};

export const loadSavedState = () => {
  const stateFromUrl = parseUrlQueryParams();
  if (stateFromUrl) {
    return stateFromUrl;
  }

  const savedSplits = loadFromLocalStorage();
  if (savedSplits) {
    return savedSplits;
  }

  return null;
};

export const saveState = (
  distance: string | number,
  unitId: Unit,
  duration: string
) => {
  saveToLocalStorage(distance, unitId, duration);
  setUrlQueryParams(String(distance), String(unitId), duration);
};
