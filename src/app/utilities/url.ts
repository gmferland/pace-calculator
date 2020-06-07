import { units, routes } from '../../common/config';

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
      unit: Number(unit),
      time,
    };
  }
  return null;
};

export const setImageMetaTags = () => {
  const params = parseUrlQueryParams();
  if (!params) {
    return;
  }

  let unitName = '';
  if (params.unit) {
    // Match id to config
    const matchingUnit = units.find(unit => unit.id === Number(params.unit));
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

export const setUrlMetaTags = (currentRoute: string) => {
  const routeConfig = routes.find(r => r.route === currentRoute);
  if (routeConfig) {
    const titleElement = document.querySelector('title');
    if (titleElement) {
      titleElement.text = routeConfig.title;
    }
    const metaTitleElement = document.querySelector('meta[name="title"]');
    if (metaTitleElement) {
      metaTitleElement.setAttribute('content', routeConfig.title);
    }

    const twitterTitleElement = document.querySelector(
      'meta[property="twitter:title"]'
    );
    if (twitterTitleElement) {
      twitterTitleElement.setAttribute('content', routeConfig.title);
    }

    const twitterUrlElement = document.querySelector(
      'meta[property="twitter:url"]'
    );
    if (twitterUrlElement) {
      const { protocol, host } = window.location;
      const fullUrl = `${protocol}//${host}${currentRoute}`;
      twitterUrlElement.setAttribute('content', fullUrl);
    }
  }
};
