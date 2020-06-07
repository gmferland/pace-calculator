import { raceOptions, splits, Unit, units } from './config';

export interface FormattedSplit {
  name: string;
  duration: string;
}

interface RawSplit {
  name: string;
  time: number;
}

/**
 * Convert a time in seconds to a duration string.
 */
export const convertToDuration = (time: number): string => {
  const durationBuilder = [];

  while (time > 0) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time);
    if (hours >= 1) {
      durationBuilder.push(String(hours));
      time = time - hours * 3600;
      if (time === 0) {
        durationBuilder.push('00', '00');
      }
    } else if (minutes >= 1) {
      let minutesString = String(minutes);
      if (durationBuilder.length > 0) {
        // only want the leading zero on minutes if there are hours as well
        minutesString = minutesString.padStart(2, '0');
      }
      durationBuilder.push(minutesString);
      time = time - minutes * 60;
      if (time === 0) {
        durationBuilder.push('00');
      }
    } else {
      let secondsString = String(seconds);
      if (durationBuilder.length > 0) {
        // only want the leading zero on seconds if there are minutes as well
        secondsString = secondsString.padStart(2, '0');
      }
      durationBuilder.push(secondsString);
      time = 0;
    }
  }

  return durationBuilder.length > 1
    ? durationBuilder.join(':')
    : String(durationBuilder[0]) + ' sec';
};

/**
 * Converts time in seconds to formatted duration for an array of split objects.
 */
export const formatSplits = (
  splits: Array<RawSplit>
): Array<FormattedSplit> => {
  return splits.map(split => ({
    name: split.name,
    duration: convertToDuration(split.time),
  }));
};

/**
 * Convert time duration (hh:mm:ss) to a number in seconds.
 */
export const convertToSeconds = (duration: string): number => {
  const tokens = duration.split(':');
  if (tokens.length > 3) {
    throw new Error('Please format time as hh:mm:ss or mm:ss');
  }

  return tokens.reduceRight((seconds, current, index) => {
    return seconds + Number(current) * Math.pow(60, tokens.length - 1 - index);
  }, 0);
};

/**
 * Converts a distance in an arbitrary unit to a distance in meters.
 */
export const convertToMeters = (distance: number, unitId: Unit): number => {
  if (unitId === Unit.Meters) {
    return distance;
  }

  const matchingUnit = units.find(unit => unit.id === unitId);

  if (!matchingUnit) {
    throw new Error('Sorry, that unit of measurement is not recognized');
  }

  const conversionCoefficient = matchingUnit.conversions.find(
    conversion => conversion.to === Unit.Meters
  );

  if (!conversionCoefficient) {
    throw new Error('Sorry, that unit of measurement is not recognized');
  }

  return distance * conversionCoefficient.value;
};

/**
 * Calculate intermediate splits for the given distance (m) and time (s)
 */
export const calculateSplits = (distance: number, time: number) => {
  return splits
    .filter(split => split.visible(distance))
    .map(split => ({
      name: split.name,
      time: Math.round((time * split.distance) / distance),
    }));
};

/**
 * Calculate the projected (i.e. extrapolated) finish time of a race
 * given the intermediate split at the intermediate distance.
 * @param intermediateDistance A distance in meters of an intermediate split.
 * @param intermediateTime The time in seconds taken to cover the intermediate distance.
 * @param totalDistance The total distance in meters of the race.
 */
export const calculateFinishTime = (
  intermediateDistance: number,
  intermediateTime: number,
  totalDistance: number
) => {
  return (intermediateTime * totalDistance) / intermediateDistance;
};

/**
 * Calculate splits and return a formatted value for display.
 */
export function getSplits(
  distance: number,
  unit: Unit,
  time: string
): Array<FormattedSplit> {
  const distanceInMeters = convertToMeters(distance, unit);
  const durationInSeconds = convertToSeconds(time);
  const splits = calculateSplits(distanceInMeters, durationInSeconds);
  return formatSplits(splits);
}

/**
 * Calculate predicted/extrapolated finish time for a race
 * based on an intermediate split at an arbitrary distance.
 */
export const predictRaceTime = (
  paceTime: string,
  paceDistance: number,
  paceDistanceUnit: Unit,
  raceDistance: number,
  raceDistanceUnit: Unit
): string => {
  const paceDistanceInMeters = convertToMeters(paceDistance, paceDistanceUnit);
  const paceTimeInSeconds = convertToSeconds(paceTime);
  const raceDistanceInMeters = convertToMeters(raceDistance, raceDistanceUnit);

  const finishTimeInSeconds = calculateFinishTime(
    paceDistanceInMeters,
    paceTimeInSeconds,
    raceDistanceInMeters
  );

  return convertToDuration(finishTimeInSeconds);
};
