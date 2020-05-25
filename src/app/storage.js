import { raceOptions } from '../../preact-app/common/config';
import { getDistanceAndUnitValue } from '../../preact-app/common/calculation';





export function setMetaTags() {
  const url = new URL(window.location.href);
  const distance = url.searchParams.get('distance');
  const time = url.searchParams.get('time');
  const unit = url.searchParams.get('unit');
  const distanceURI = encodeURI(distance);
  const timeURI = encodeURI(time);
  const calcString = `${distanceURI}-${time}`;
  console.log(calcString);
  document
    .getElementById('og_image')
    .setAttribute(
      'content',
      `https://racepace-og.now.sh/${calcString}.png?theme=light&md=1`
    );
  document
    .getElementById('tw_image')
    .setAttribute(
      'content',
      `https://racepace-og.now.sh/${calcString}.png?theme=light&md=1`
    );
}
