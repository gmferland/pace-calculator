module.exports = {
  raceOptions: [
    {
      name: '1500',
      distance: 1500,
      unit: '1',
    },
    {
      name: 'Mile',
      distance: 1,
      unit: '3',
    },
    {
      name: '3k',
      distance: 3000,
      unit: '1',
    },
    {
      name: '2 Mile',
      distance: 2,
      unit: '3',
    },
    {
      name: '5k',
      distance: 5000,
      unit: '1',
    },
    {
      name: '8k',
      distance: 8000,
      unit: '1',
    },
    {
      name: '10k',
      distance: 10000,
      unit: '1',
    },
    {
      name: '15k',
      distance: 15000,
      unit: '1',
    },
    {
      name: '20k',
      distance: 20000,
      unit: '1',
    },
    {
      name: 'Half Marathon',
      distance: 21097.5,
      unit: '1',
    },
    {
      name: 'Marathon',
      distance: 42195,
      unit: '1',
    },
  ],
  raceDistances: {
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
  },
  splits: [
    {
      name: '200m',
      distance: 200,
      visible: function(distance) {
        return distance > 200 && distance <= 8000;
      },
    },
    {
      name: '400m',
      distance: 400,
      visible: function(distance) {
        return distance > 400 && distance <= 10000;
      },
    },
    {
      name: '800m',
      distance: 800,
      visible: function(distance) {
        return distance > 800 && distance <= 10000;
      },
    },
    {
      name: '1k',
      distance: 1000,
      visible: function(distance) {
        return distance > 1000;
      },
    },
    {
      name: '1 mile',
      distance: 1609.344,
      visible: function(distance) {
        return distance > 1609.344;
      },
    },
    {
      name: '3k',
      distance: 3000,
      visible: function(distance) {
        return distance > 3000;
      },
    },
    {
      name: '5k',
      distance: 5000,
      visible: function(distance) {
        return distance > 5000;
      },
    },
    {
      name: '10k',
      distance: 10000,
      visible: function(distance) {
        return distance > 10000;
      },
    },
  ],
  units: [
    {
      id: '1',
      name: 'Meters',
      aliases: ['m'],
      conversions: [
        {
          to: '2',
          value: 0.001,
        },
        {
          to: '3',
          value: 0.0006213712,
        },
      ],
    },
    {
      id: '2',
      name: 'Km',
      aliases: ['k', 'km'],
      conversions: [
        {
          to: '1',
          value: 1000,
        },
        {
          to: '3',
          value: 0.6213712,
        },
      ],
    },
    {
      id: '3',
      name: 'Miles',
      aliases: ['mi'],
      conversions: [
        {
          to: '1',
          value: 1609.344,
        },
        {
          to: '2',
          value: 1.609344,
        },
      ],
    },
  ],
};
