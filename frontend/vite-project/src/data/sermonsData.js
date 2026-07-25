const thumbnail = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=450&fit=crop';
const liveThumb = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop';
const bibleImg = 'https://images.unsplash.com/photo-1613937855439-20cecc75d91a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const featuredImg = 'https://images.unsplash.com/photo-1613937855439-20cecc75d91a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const eotcVideos = [
  'https://www.youtube.com/watch?v=uYoYa7p2PYA',
  'https://www.youtube.com/watch?v=fp7WLmqHP0Y',
  'https://www.youtube.com/watch?v=JDEFW2U0-BY',
  'https://www.youtube.com/watch?v=7xx3KqFJS4Y',
  'https://www.youtube.com/watch?v=VY4b_4LVZDA',
  'https://www.youtube.com/watch?v=qvspWit8tbk',
];

export const heroData = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Sermons', href: '/sermons' },
  ],
  title: 'Sermons & Media',
  subtitle:
    'Grow in faith through sermons, teachings, Holy Scripture, and live worship.',
};

export const liveStream = {
  isLive: false,
  videoUrl: eotcVideos[0],
  title: 'Sunday Divine Liturgy',
  description:
    'Join us live every Sunday as we celebrate the Divine Liturgy in the ancient tradition of the Ethiopian Orthodox Tewahedo Church.',
  startTime: 'Sunday, 8:00 AM',
  nextService: 'Next Service in',
  nextServiceDate: '2026-07-20T08:00:00',
  scheduleLabel: 'View Full Schedule',
  thumbnail: liveThumb,
};

export const featuredTeaching = {
  id: 'featured-001',
  title: 'The Mystery of the Holy Trinity',
  priest: 'Fr. Abba Yohannes',
  date: 'July 12, 2026',
  duration: '42:15',
  bibleVerse: 'Matthew 28:19',
  description:
    'A profound exploration of the Holy Trinity as revealed in the Scriptures and preserved in the teachings of the Church Fathers. This teaching illuminates the ancient understanding of the Triune God handed down through the apostolic tradition of the Ethiopian Orthodox Church.',
  thumbnail: featuredImg,
  videoUrl: eotcVideos[0],
};

export const sermons = [
  {
    id: 'sermon-001',
    title: 'The Power of the Cross',
    priest: 'Fr. Abba Tekle',
    date: 'July 5, 2026',
    duration: '38:42',
    bibleVerse: '1 Corinthians 1:18',
    thumbnail,
    videoUrl: eotcVideos[1],
  },
  {
    id: 'sermon-002',
    title: 'የእግዚአብሔር ፍቅር (The Love of God)',
    priest: 'Fr. Abba Yohannes',
    date: 'June 28, 2026',
    duration: '45:30',
    bibleVerse: 'ዮሐንስ 3:16',
    thumbnail,
    videoUrl: eotcVideos[2],
  },
  {
    id: 'sermon-003',
    title: 'The Life of the Saints',
    priest: 'Fr. Abba Michael',
    date: 'June 21, 2026',
    duration: '35:10',
    bibleVerse: 'Hebrews 12:1',
    thumbnail,
    videoUrl: eotcVideos[3],
  },
  {
    id: 'sermon-004',
    title: 'Repentance and the Kingdom',
    priest: 'Fr. Abba Gebre',
    date: 'June 14, 2026',
    duration: '41:08',
    bibleVerse: 'Mark 1:15',
    thumbnail,
    videoUrl: eotcVideos[4],
  },
  {
    id: 'sermon-005',
    title: 'Prayer Without Ceasing',
    priest: 'Fr. Abba Yohannes',
    date: 'May 31, 2026',
    duration: '36:55',
    bibleVerse: '1 Thessalonians 5:17',
    thumbnail,
    videoUrl: eotcVideos[5],
  },
  {
    id: 'sermon-006',
    title: 'The Holy Eucharist: Heaven on Earth',
    priest: 'Fr. Abba Michael',
    date: 'May 24, 2026',
    duration: '47:32',
    bibleVerse: 'John 6:51',
    thumbnail,
    videoUrl: eotcVideos[0],
  },
];

export const sermonCategories = [
  {
    id: 'cat-001',
    title: 'Sunday Liturgy',
    description: 'Weekly Divine Liturgy sermons',
    icon: 'church',
    count: 24,
  },
  {
    id: 'cat-002',
    title: 'Bible Study',
    description: 'Deep dives into Scripture',
    icon: 'bible',
    count: 18,
  },
  {
    id: 'cat-003',
    title: 'Feast Days',
    description: 'Major feast celebrations',
    icon: 'feast',
    count: 15,
  },
  {
    id: 'cat-004',
    title: 'Youth Teachings',
    description: 'For the young in faith',
    icon: 'youth',
    count: 12,
  },
  {
    id: 'cat-005',
    title: 'Prayer',
    description: 'Teachings on prayer',
    icon: 'prayer',
    count: 14,
  },
  {
    id: 'cat-006',
    title: 'Church History',
    description: 'Our rich heritage',
    icon: 'history',
    count: 9,
  },
];

export const audioSermons = [
  {
    id: 'audio-001',
    title: "The Lord's Prayer Explained",
    priest: 'Fr. Abba Yohannes',
    duration: '52:10',
    audioUrl: '/audio/lords-prayer.mp3',
  },
  {
    id: 'audio-002',
    title: 'አምላከ አበው (God of Our Fathers)',
    priest: 'Fr. Abba Tekle',
    duration: '48:35',
    audioUrl: '/audio/god-fathers.mp3',
  },
  {
    id: 'audio-003',
    title: 'The Ten Commandments Today',
    priest: 'Fr. Abba Michael',
    duration: '44:20',
    audioUrl: '/audio/ten-commandments.mp3',
  },
  {
    id: 'audio-004',
    title: 'የምስጋና ቃል (Word of Thanksgiving)',
    priest: 'Fr. Abba Gebre',
    duration: '38:15',
    audioUrl: '/audio/thanksgiving.mp3',
  },
];

export const geEzResources = [
  {
    id: 'res-001',
    title: 'Divine Liturgy',
    subtitle: 'Qiddase',
    description:
      'The complete text of the Holy Liturgy according to the Alexandrian Rite as received by the Ethiopian Orthodox Tewahedo Church.',
    icon: 'cross',
    pdfUrl: '/pdfs/qiddase.pdf',
    audioUrl: '/audio/qiddase.mp3',
  },
  {
    id: 'res-002',
    title: 'Morning Prayer',
    subtitle: 'Saatat',
    description:
      'The prayers of the hours for the morning, including psalms, hymns, and intercessions.',
    icon: 'sun',
    pdfUrl: '/pdfs/morning-prayer.pdf',
    audioUrl: '/audio/morning-prayer.mp3',
  },
  {
    id: 'res-003',
    title: 'Evening Prayer',
    subtitle: 'Vespers',
    description:
      'The evening prayers of the Church, a time of thanksgiving and reflection on the day.',
    icon: 'moon',
    pdfUrl: '/pdfs/evening-prayer.pdf',
    audioUrl: '/audio/evening-prayer.mp3',
  },
  {
    id: 'res-004',
    title: 'Holy Week',
    subtitle: 'Himamat',
    description:
      'The complete liturgy and prayers for the Passion Week leading to the glorious Resurrection.',
    icon: 'book',
    pdfUrl: '/pdfs/holy-week.pdf',
    audioUrl: '/audio/holy-week.mp3',
  },
];

export const scriptureHighlight = {
  verse:
    'In the beginning was the Word, and the Word was with God, and the Word was God.',
  reference: 'John 1:1',
  explanation:
    "The Gospel of John opens with this profound declaration of Christ's divine nature. For the Ethiopian Orthodox Church, this verse affirms the eternal existence of the Logos, the Second Person of the Holy Trinity, who took flesh for our salvation.",
  image: bibleImg,
};

export const sidebarContent = {
  upcomingServices: [
    { day: 'Sunday', time: '8:00 AM', service: 'Divine Liturgy' },
    { day: 'Wednesday', time: '6:00 PM', service: 'Bible Study' },
    { day: 'Friday', time: '5:30 PM', service: 'Evening Prayer' },
    { day: 'Saturday', time: '7:00 AM', service: 'Morning Prayer' },
  ],
  popularSermons: [
    { title: 'The Mystery of the Holy Trinity', priest: 'Fr. Abba Yohannes', href: '#', views: 2847 },
    { title: 'The Power of the Cross', priest: 'Fr. Abba Tekle', href: '#', views: 2103 },
    { title: 'Life in the Holy Spirit', priest: 'Fr. Abba Gebre', href: '#', views: 1892 },
  ],
};
