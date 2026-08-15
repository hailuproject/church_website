const amMonths = [
  'ጃንዋሪ',
  'ፌብሩዋሪ',
  'ማርች',
  'ኤፕሪል',
  'ሜይ',
  'ጁን',
  'ጁላይ',
  'ኦገስት',
  'ሴፕቴምበር',
  'ኦክቶበር',
  'ኖቨምበር',
  'ዲሴምበር',
];

const amMonthsShort = [
  'ጃን',
  'ፌብ',
  'ማር',
  'ኤፕ',
  'ሜይ',
  'ጁን',
  'ጁላይ',
  'ኦገ',
  'ሴፕ',
  'ኦክ',
  'ኖቭ',
  'ዲሴ',
];

const amDays = ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'];
const amDayPeriods = {
  am: 'ጠዋት',
  pm: 'ከሰዓት',
  midnight: 'እኩለ ሌሊት',
  noon: 'ቀትር',
  morning: 'ጠዋት',
  afternoon: 'ከሰዓት በኋላ',
  evening: 'ማታ',
  night: 'ሌሊት',
};

const amLocalize = {
  ordinalNumber: (dirtyNumber) => String(dirtyNumber),
  era: (index) => (index === 0 ? 'ዓ.ዓ.' : 'ዓ.ም.'),
  quarter: (index) => String((index % 4) + 1),
  month: (index, options) => {
    const monthIndex = ((index % 12) + 12) % 12;
    const width = options?.width;
    if (width === 'wide' || width === 'standalone') return amMonths[monthIndex];
    return amMonthsShort[monthIndex] ?? amMonths[monthIndex];
  },
  day: (index) => amDays[((index % 7) + 7) % 7],
  weekday: {
    wide: amDays,
    abbreviated: amDays,
    short: amDays,
    narrow: amDays,
  },
  dayPeriod: (value) => amDayPeriods[value] ?? amDayPeriods.pm,
};

const amFormatLong = {
  date: () => 'MMMM d, yyyy',
  time: () => 'h:mm a',
  dateTime: () => 'MMMM d, yyyy h:mm a',
};

export const amLocale = {
  code: 'am',
  formatDistance: () => '',
  formatLong: amFormatLong,
  formatRelative: () => '',
  localize: amLocalize,
  match: {},
  options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
};

export default amLocale;
