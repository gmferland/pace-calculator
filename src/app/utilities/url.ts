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

export const setMetaTags = () => {
  // Guard for SSR environment
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  const distance = url.searchParams.get("distance");
  const time = url.searchParams.get("time");
  if (!(distance && time)) {
    return;
  }

  const distanceURI = encodeURI(distance);
  const timeURI = encodeURI(time);
  const calcString = `${distanceURI}-${timeURI}`;

  const openGraphImage = document.getElementById("og_image");
  if (openGraphImage) {
    openGraphImage.setAttribute(
      "content",
      `https://racepace-og.now.sh/${calcString}.png?theme=light&md=1`
    );
  }

  const twitterImage = document.getElementById("tw_image");
  if (twitterImage) {
    twitterImage.setAttribute(
      "content",
      `https://racepace-og.now.sh/${calcString}.png?theme=light&md=1`
    );
  }
};
