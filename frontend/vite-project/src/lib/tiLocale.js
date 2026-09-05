const tiMonths = [
  'ጥሪ',
  'ለካቲት',
  'መጋቢት',
  'ሚያዝያ',
  'ግንቦት',
  'ሰነ',
  'ሓምለ',
  'ነሓሰ',
  'መስከረም',
  'ጥቅምቲ',
  'ሕዳር',
  'ታሕሳስ',
];

const tiMonthsShort = [
  'ጥሪ',
  'ለካ',
  'መጋ',
  'ሚያ',
  'ግን',
  'ሰነ',
  'ሓም',
  'ነሓ',
  'መስ',
  'ጥቅ',
  'ሕዳ',
  'ታሕ',
];

const tiDays = ['ሰንበት', 'ሰኑይ', 'ሰሉስ', 'ረቡዕ', 'ሓሙስ', 'ዓርቢ', 'ቀዳም'];
const tiDayPeriods = {
  am: 'ንግሆ',
  pm: 'ድሕሪ ቀትሪ',
  midnight: 'ፍርቂ ለይቲ',
  noon: 'ቀትሪ',
  morning: 'ንግሆ',
  afternoon: 'ድሕሪ ቀትሪ',
  evening: 'ምሸት',
  night: 'ለይቲ',
};

const tiLocalize = {
  ordinalNumber: (dirtyNumber) => String(dirtyNumber),
  era: (index) => (index === 0 ? 'ዓ.ዓ.' : 'ዓ.ም.'),
  quarter: (index) => String((index % 4) + 1),
  month: (index, options) => {
    const monthIndex = ((index % 12) + 12) % 12;
    const width = options?.width;
    if (width === 'wide' || width === 'standalone') return tiMonths[monthIndex];
    return tiMonthsShort[monthIndex] ?? tiMonths[monthIndex];
  },
  day: (index) => tiDays[((index % 7) + 7) % 7],
  weekday: {
    wide: tiDays,
    abbreviated: tiDays,
    short: tiDays,
    narrow: tiDays,
  },
  dayPeriod: (value) => tiDayPeriods[value] ?? tiDayPeriods.pm,
};

const tiFormatLong = {
  date: () => 'MMMM d, yyyy',
  time: () => 'h:mm a',
  dateTime: () => 'MMMM d, yyyy h:mm a',
};

export const tiLocale = {
  code: 'ti',
  formatDistance: () => '',
  formatLong: tiFormatLong,
  formatRelative: () => '',
  localize: tiLocalize,
  match: {},
  options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
};

export default tiLocale;