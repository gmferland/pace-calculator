import { units } from '../../common/config';

export const setUrlQueryParams = (
  distance: string,
  unitId: string,
  duration: string
) => {
  // Guard for SSR environment
  if (typeof window === 'undefined') {
    return;
  }

  const location = window.location.href;
  const url = new URL(location);
  if (url.searchParams.get('distance')) {
    url.searchParams.set('distance', distance);
    url.searchParams.set('time', duration);
    if (unitId) {
      url.searchParams.set('unit', unitId);
    } else {
      url.searchParams.delete('unit');
    }
  } else {
    url.searchParams.append('distance', distance);
    url.searchParams.append('time', duration);
    if (unitId) {
      url.searchParams.append('unit', unitId);
    }
  }

  window.history.replaceState({}, '', url.toJSON());
};

export const parseUrlQueryParams = () => {
  // Guard for SSR environment
  if (typeof window === 'undefined') {
    return;
  }
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
};

export const setMetaTags = () => {
  const params = parseUrlQueryParams();
  if (!params) {
    return;
  }

  let unitName: string = '';
  if (params.unit) {
    // Match id to config
    const matchingUnit = units.find(unit => unit.id === params.unit);
    // Grab name if it exists (which it should...)
    if (matchingUnit) {
      unitName = matchingUnit.name;
    }
  }

  const distanceURI = unitName
    ? encodeURI(`${params.distance} ${unitName}`)
    : encodeURI(params.distance);
  const timeURI = encodeURI(params.time);
  const calcString = `${distanceURI}-${timeURI}`;

  const openGraphImage = document.getElementById('og_image');
  if (openGraphImage) {
    openGraphImage.setAttribute(
      'content',
      `https://racepace-og.now.sh/${calcString}.png?theme=light&md=1`
    );
  }

  const twitterImage = document.getElementById('tw_image');
  if (twitterImage) {
    twitterImage.setAttribute(
      'content',
      `https://racepace-og.now.sh/${calcString}.png?theme=light&md=1`
    );
  }
};
