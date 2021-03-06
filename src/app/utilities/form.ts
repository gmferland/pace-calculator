import { raceOptions, Unit, units } from 'common/config';

export interface DistanceValue {
  distance: number;
  unit: Unit;
  displayName: string;
}

export const getCanonicalNameForUnit = (unit: Unit) => {
  switch (unit) {
    case Unit.Meters:
      return 'meters';
    case Unit.Kilometers:
      return 'kilometers';
    case Unit.Miles:
      return 'miles';
    default:
      return '';
  }
};

export const parseDistanceInput = (value: string): DistanceValue => {
  // Use configured values if custom race
  const matchingRace = raceOptions.find(
    race =>
      // Allow some leeway in matching
      race.name.replace(/\s/g, '').toLowerCase() ===
      value.replace(/\s/g, '').toLowerCase()
  );
  if (matchingRace) {
    return {
      distance: matchingRace.distance,
      unit: matchingRace.unit,
      displayName: matchingRace.name,
    };
  }

  // Try to parse numeric distance
  const formatExpr = /([0-9.]+)/g;
  const result = formatExpr.exec(value);
  // Captured expression will be index 1 in the result array
  const distance = result && result.length > 1 ? Number(result[1]) : 0;
  let unit = Unit.Unknown;
  units.forEach(unitConfig => {
    // Try to match text content to a known unit
    if (
      unitConfig.aliases.some(alias =>
        value.toLowerCase().includes(alias.toLowerCase())
      )
    ) {
      unit = unitConfig.id;
    }
  });
  return {
    distance,
    unit,
    displayName: `${distance} ${getCanonicalNameForUnit(unit)}`,
  };
};
