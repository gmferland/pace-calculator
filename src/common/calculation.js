import * as config from './config';

/**
 * Calculate splits and return a formatted value for display.
 * @param {number} time Total race time in seconds.
 * @param {string} distance Id (race name) corresponding to the total distance.
 */
export function getFormattedSplits(time, distance) {
  const splits = calculateSplits(time, distance);
  return formatSplits(splits);
}

/**
 * Converts time in seconds to formatted duration for an array of split objects.
 * @param {{ race: string, time: number }} splits An array of split objects.
 */
export function formatSplits(splits) {
  if (splits) {
    return splits.map(function(split) {
      return {
        race: split.race,
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
 * Calculate intermediate splits for the given distance (m) and time (s)
 * @param {number} time A time in seconds.
 * @param {string} raceName An id (race name) of a given distance.
 */
export function calculateSplits(time, raceName) {
  if (raceName === 'default') {
    return null;
  }
  const matchingRaceOptions = config.raceOptions.find(function(race) {
    return race.race === raceName;
  });
  if (!matchingRaceOptions) {
    throw new Error('Sorry, custom distance is not supported yet.');
  }
  return matchingRaceOptions.splits.map(function(splitName) {
    return {
      race: splitName,
      time: Math.round(
        (time * config.raceDistances[splitName]) /
          config.raceDistances[raceName]
      ),
    };
  });
}
