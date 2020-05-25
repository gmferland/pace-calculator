import * as config from "./config";

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
        durationBuilder.push("00", "00");
      }
    } else if (minutes >= 1) {
      let minutesString = String(minutes);
      if (durationBuilder.length > 0) {
        // only want the leading zero on minutes if there are hours as well
        minutesString = minutesString.padStart(2, "0");
      }
      durationBuilder.push(minutesString);
      time = time - minutes * 60;
      if (time === 0) {
        durationBuilder.push("00");
      }
    } else {
      let secondsString = String(seconds);
      if (durationBuilder.length > 0) {
        // only want the leading zero on seconds if there are minutes as well
        secondsString = secondsString.padStart(2, "0");
      }
      durationBuilder.push(seconds);
      time = 0;
    }
  }

  return durationBuilder.length > 1
    ? durationBuilder.join(":")
    : String(durationBuilder[0]) + " sec";
};

/**
 * Converts time in seconds to formatted duration for an array of split objects.
 */
export const formatSplits = (
  splits: Array<RawSplit>
): Array<FormattedSplit> => {
  return splits.map(split => ({
    name: split.name,
    duration: convertToDuration(split.time)
  }));
};

/**
 * Convert time duration (hh:mm:ss) to a number in seconds.
 */
export const convertToSeconds = (duration: string): number => {
  const tokens = duration.split(":");
  if (tokens.length > 3) {
    throw new Error("Please format time as hh:mm:ss or mm:ss");
  }

  return tokens.reduceRight((seconds, current, index) => {
    if (/[^0-9.]/.exec(current) !== null) {
      throw new Error("Time must only contain positive numbers");
    }
    return seconds + Number(current) * Math.pow(60, tokens.length - 1 - index);
  }, 0);
};

/**
 * Converts a distance in an arbitrary unit to a distance in meters.
 */
export const convertToMeters = (distance: number, unitId: string): number => {
  const idOfMetersUnit = "1";
  if (unitId === idOfMetersUnit) {
    return distance;
  }

  const matchingUnit = config.units.find(unit => unit.id === unitId);

  if (!matchingUnit) {
    throw new Error("Sorry, that unit of measurement is not recognized");
  }

  const conversionCoefficient = matchingUnit.conversions.find(
    conversion => conversion.to === idOfMetersUnit
  );

  if (!conversionCoefficient) {
    throw new Error("Sorry, that unit of measurement is not recognized");
  }

  return distance * conversionCoefficient.value;
};

/**
 * Calculate intermediate splits for the given distance (m) and time (s)
 */
export const calculateSplits = (distance: number, time: number) => {
  return config.splits
    .filter(split => split.visible(distance))
    .map(split => ({
      name: split.name,
      time: Math.round((time * split.distance) / distance)
    }));
};

/**
 * Calculate splits and return a formatted value for display.
 */
export function getSplits(
  distance: string,
  unitId: string,
  duration: string
): Array<FormattedSplit> {
  const distanceInMeters = convertToMeters(parseInt(distance), unitId);
  const durationInSeconds = convertToSeconds(duration);
  const splits = calculateSplits(distanceInMeters, durationInSeconds);
  return formatSplits(splits);
}
