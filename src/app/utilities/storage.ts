import { parseUrlQueryParams, setUrlQueryParams } from "./url";

const storageKey = "savedSplits";

const saveToLocalStorage = (
  distance: string,
  unitId: string,
  duration: string
) => {
  // Guard for SSR environment
  if (typeof window === "undefined") {
    return;
  }
  const storageItem = JSON.stringify({ distance, unitId, duration });
  window.localStorage.setItem(storageKey, storageItem);
};

const loadFromLocalStorage = () => {
  // Guard for SSR environment
  if (typeof window === "undefined") {
    return;
  }

  const storedItem = window.localStorage.getItem(storageKey);
  if (storedItem) {
    const savedState = JSON.parse(storedItem);
    return {
      distance: savedState.distance,
      unit: savedState.unitId,
      time: savedState.duration
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
  distance: string,
  unitId: string,
  duration: string
) => {
  saveToLocalStorage(distance, unitId, duration);
  setUrlQueryParams(distance, unitId, duration);
};
