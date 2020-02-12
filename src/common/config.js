module.exports = {
  raceOptions: [
    {
      race: '1500',
      splits: ['400'],
    },
    {
      race: 'Mile',
      splits: ['400'],
    },
    {
      race: '3k',
      splits: ['400', '1k', 'Mile'],
    },
    {
      race: '2 Mile',
      splits: ['400', '1k', 'Mile', '3k'],
    },
    {
      race: '5k',
      splits: ['400', '1k', 'Mile', '3k'],
    },
    {
      race: '8k',
      splits: ['1k', 'Mile', '3k', '5k'],
    },
    {
      race: '10k',
      splits: ['1k', 'Mile', '3k', '5k'],
    },
    {
      race: '15k',
      splits: ['1k', 'Mile', '3k', '5k', '10k'],
    },
    {
      race: '20k',
      splits: ['1k', 'Mile', '3k', '5k', '10k'],
    },
    {
      race: 'Half Marathon',
      splits: ['1k', 'Mile', '3k', '5k', '10k'],
    },
    {
      race: 'Marathon',
      splits: ['1k', 'Mile', '3k', '5k', '10k'],
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
  units: [
    {
      id: 1,
      name: 'Meters',
      aliases: ['m'],
      conversions: [
        {
          to: 2,
          value: 0.001,
        },
        {
          to: 3,
          value: 0.0006213712,
        },
      ],
    },
    {
      id: 2,
      name: 'Kilometers',
      aliases: ['k', 'km'],
      conversions: [
        {
          to: 1,
          value: 1000,
        },
        {
          to: 3,
          value: 0.6213712,
        },
      ],
    },
    {
      id: 3,
      name: 'Miles',
      aliases: ['mi'],
      conversions: [
        {
          to: 1,
          value: 1609.344,
        },
        {
          to: 2,
          value: 1.609344,
        },
      ],
    },
  ],
};
