import * as config from './config';

/**
 * Calculate splits and return a formatted value for display.
 * @param {number} distance Total race distance in meters.
 * @param {number} time Total race time in seconds.
 * @returns {Array<{ name: string, time: string }>} An array of formatted split objects.
 */
export function getFormattedSplits(distance, time) {
  const splits = calculateSplits(distance, time);
  return formatSplits(splits);
}

/**
 * Converts time in seconds to formatted duration for an array of split objects.
 * @param {Array<{ name: string, time: number }>} splits An array of split objects.
 * @returns {Array<{ name: string, time: string }>} An array of formatted split objects.
 */
export function formatSplits(splits) {
  if (splits) {
    return splits.map(function(split) {
      return {
        name: split.name,
        time: convertToDuration(split.time),
      };
    });
  }
  return null;
}

/**
 * Convert a number in seconds to a time duration.
 * @param {number} time A time in seconds.
 */
function convertToDuration(time) {
  const durationBuilder = [];

  while (time > 0) {
    const hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time);
    if (hours >= 1) {
      durationBuilder.push(String(hours));
      time = time - hours * 3600;
      if (time === 0) {
        durationBuilder.push('00', '00');
      }
    } else if (minutes >= 1) {
      if (durationBuilder.length > 0) {
        // only want the leading zero on minutes if there are hours as well
        minutes = String(minutes).padStart(2, '0');
      }
      durationBuilder.push(minutes);
      time = time - minutes * 60;
      if (time === 0) {
        durationBuilder.push('00');
      }
    } else {
      if (durationBuilder.length > 0) {
        // only want the leading zero on seconds if there are minutes as well
        seconds = String(seconds).padStart(2, '0');
      }
      durationBuilder.push(seconds);
      time = 0;
    }
  }

  return durationBuilder.length > 1
    ? durationBuilder.join(':')
    : String(durationBuilder[0]) + ' sec';
}

/**
 * Convert time duration (hh:mm:ss) to a number in seconds.
 * @param {string} duration A formatted duration string.
 */
export function convertToSeconds(duration) {
  const tokens = duration.split(':');
  if (tokens.length > 3) {
    throw new Error('Please format time as hh:mm:ss or mm:ss');
  }

  return tokens.reduceRight(function(seconds, current, index) {
    if (current.match(/[^0-9\.]/)) {
      throw new Error('Time must only contain positive numbers');
    }
    return seconds + Number(current) * Math.pow(60, tokens.length - 1 - index);
  }, 0);
}

/**
 * Converts a distance in an arbitrary unit to a distance in meters.
 * @param {number} distance A measure of distance.
 * @param {string} unitId The id of the unit of measurement.
 * @returns {number} The distance in meters.
 */
export function convertToMeters(distance, unitId) {
  const idOfMetersUnit = '1';
  if (unitId === idOfMetersUnit) {
    return distance;
  }

  const matchingUnit = config.units.find(function(unit) {
    return unit.id === unitId;
  });

  if (!matchingUnit) {
    throw new Error('Sorry, that unit of measurement is not recognized');
  }

  const conversionCoefficient = matchingUnit.conversions.find(function(
    conversion
  ) {
    return conversion.to === idOfMetersUnit;
  });

  return distance * conversionCoefficient.value;
}

/**
 * Calculate intermediate splits for the given distance (m) and time (s)
 * @param {number} distance A distance in meters.
 * @param {number} time A time in seconds.
 * @returns {Array<{ name: string, time: number }>} An array of split objects.
 */
export function calculateSplits(distance, time) {
  return config.splits
    .filter(function(split) {
      return split.visible(distance);
    })
    .map(function(split) {
      return {
        name: split.name,
        time: Math.round((time * split.distance) / distance),
      };
    });
}
