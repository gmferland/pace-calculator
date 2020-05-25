export const setUrlQueryParams = (
  distance: string,
  unitId: string,
  duration: string
) => {
  // Guard for SSR environment
  if (typeof window === "undefined") {
    return;
  }

  const location = window.location.href;
  const url = new URL(location);
  if (url.searchParams.get("distance")) {
    url.searchParams.set("distance", distance);
    url.searchParams.set("time", duration);
    if (unitId) {
      url.searchParams.set("unit", unitId);
    } else {
      url.searchParams.delete("unit");
    }
  } else {
    url.searchParams.append("distance", distance);
    url.searchParams.append("time", duration);
    if (unitId) {
      url.searchParams.append("unit", unitId);
    }
  }

  window.history.replaceState({}, "", url.toJSON());
};

export const parseUrlQueryParams = () => {
  // Guard for SSR environment
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  const distance = url.searchParams.get("distance");
  const time = url.searchParams.get("time");
  const unit = url.searchParams.get("unit");
  if (distance && time) {
    return {
      distance,
      unit,
      time
    };
  }
  return null;
};
