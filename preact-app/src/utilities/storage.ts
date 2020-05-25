import { parseUrlQueryParams } from "./url";

const storageKey = "savedSplits";

/**
 * Save state to local storage.
 */
export const saveState = (
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

/**
 * Load saved state from local storage.
 */
export const loadState = () => {
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

  const savedSplits = loadState();
  if (savedSplits) {
    return savedSplits;
  }

  return null;
};
