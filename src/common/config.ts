export enum Unit {
  Unknown = 0,
  Meters = 1,
  Kilometers = 2,
  Miles = 3,
}

export interface RouteConfig {
  title: string;
  label: string;
  route: string;
}

export const routes: RouteConfig[] = [
  {
    title: 'Pace Calculator | Race Pace Space',
    label: 'Pace Calculator',
    route: '/',
  },
  {
    title: 'Race Predictor | Race Pace Space',
    label: 'Race Predictor',
    route: '/race-predictor',
  },
];

export const raceOptions = [
  {
    name: '1500',
    distance: 1500,
    unit: Unit.Meters,
  },
  {
    name: 'Mile',
    distance: 1,
    unit: Unit.Miles,
  },
  {
    name: '3k',
    distance: 3000,
    unit: Unit.Meters,
  },
  {
    name: '2 Mile',
    distance: 2,
    unit: Unit.Miles,
  },
  {
    name: '5k',
    distance: 5000,
    unit: Unit.Meters,
  },
  {
    name: '8k',
    distance: 8000,
    unit: Unit.Meters,
  },
  {
    name: '10k',
    distance: 10000,
    unit: Unit.Meters,
  },
  {
    name: '15k',
    distance: 15000,
    unit: Unit.Meters,
  },
  {
    name: '20k',
    distance: 20000,
    unit: Unit.Meters,
  },
  {
    name: 'Half Marathon',
    distance: 21097.5,
    unit: Unit.Meters,
  },
  {
    name: 'Marathon',
    distance: 42195,
    unit: Unit.Meters,
  },
];

export const raceDistances = {
  '200': 200,
  '400': 400,
  '800': 800,
  '1k': 1000,
  '1500': 1500,
  'Mile': 1609,
  '3k': 3000,
  '2 Mile': 3218,
  '5k': 5000,
  '8k': 8000,
  '10k': 10000,
  '15k': 15000,
  '20k': 20000,
  'Half Marathon': 21097.5,
  'Marathon': 42195,
};

export const splits = [
  {
    name: '200m',
    distance: 200,
    visible: (distance: number) => distance > 200 && distance <= 8000,
  },
  {
    name: '400m',
    distance: 400,
    visible: (distance: number) => distance > 400 && distance <= 10000,
  },
  {
    name: '800m',
    distance: 800,
    visible: (distance: number) => distance > 800 && distance <= 10000,
  },
  {
    name: '1k',
    distance: 1000,
    visible: (distance: number) => distance > 1000,
  },
  {
    name: '1 mile',
    distance: 1609.344,
    visible: (distance: number) => distance > 1609.344,
  },
  {
    name: '3k',
    distance: 3000,
    visible: (distance: number) => distance > 3000,
  },
  {
    name: '5k',
    distance: 5000,
    visible: (distance: number) => distance > 5000,
  },
  {
    name: '10k',
    distance: 10000,
    visible: (distance: number) => distance > 10000,
  },
];

export const units = [
  {
    id: Unit.Meters,
    name: 'm',
    aliases: ['m', 'meter', 'metre'],
    conversions: [
      {
        to: Unit.Kilometers,
        value: 0.001,
      },
      {
        to: Unit.Miles,
        value: 0.0006213712,
      },
    ],
  },
  {
    id: Unit.Kilometers,
    name: 'km',
    aliases: ['k', 'km', 'kilometer', 'kilometre'],
    conversions: [
      {
        to: Unit.Meters,
        value: 1000,
      },
      {
        to: Unit.Miles,
        value: 0.6213712,
      },
    ],
  },
  {
    id: Unit.Miles,
    name: 'mi',
    aliases: ['mi', 'mile'],
    conversions: [
      {
        to: Unit.Meters,
        value: 1609.344,
      },
      {
        to: Unit.Kilometers,
        value: 1.609344,
      },
    ],
  },
];
