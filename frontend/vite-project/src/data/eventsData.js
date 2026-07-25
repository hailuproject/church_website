export const heroData = {
  title: "Events & Liturgical Calendar",
  subtitle:
    "Stay connected with worship services, feast days, church programs, and community gatherings.",
  churchName: "Ethiopian Orthodox Tewahedo Church",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
  ],
  cta: [
    { label: "View Calendar", href: "#calendar", variant: "primary" },
    { label: "Upcoming Events", href: "#upcoming", variant: "outline" },
  ],
};

export const featuredEvent = {
  title: "Timkat — The Feast of Epiphany",
  date: "January 19, 2026",
  time: "5:00 AM — 3:00 PM",
  location: "Main Cathedral & Community Grounds",
  description:
    "Join us for the most joyous celebration of the Ethiopian Orthodox calendar. Timkat commemorates the baptism of Jesus Christ in the Jordan River. The celebration includes the blessing of water, processions with the Tabot, hymns, and joyful community fellowship.",
  image:
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop",
  imageAlt: "Ethiopian Orthodox Timkat celebration with colorful processions",
  countdown: { days: 147, hours: 8, minutes: 32 },
};

export const events = [
  {
    id: 1,
    title: "Sunday Divine Liturgy",
    date: "2026-01-18",
    time: "6:00 AM — 12:00 PM",
    location: "Main Church",
    description:
      "Join us for the full Sunday Kidase (Divine Liturgy) with beautiful chanting, incense, and the sacred Eucharist.",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
    category: "Sunday Worship",
  },
  {
    id: 2,
    title: "Youth Fellowship Night",
    date: "2026-01-23",
    time: "6:00 PM — 8:30 PM",
    location: "Fellowship Hall",
    description:
      "An evening of worship, discussion, and fellowship for young adults ages 16–30. Theme: Walking in Faith.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    category: "Youth",
  },
  {
    id: 3,
    title: "Bible Study — Book of Genesis",
    date: "2026-01-25",
    time: "6:00 PM — 7:30 PM",
    location: "Church Library",
    description:
      "Continuing our deep dive into the Book of Genesis with Abba Teshale. This week: The Creation Narrative.",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
    category: "Bible Study",
  },
  {
    id: 4,
    title: "Choir Practice & Rehearsal",
    date: "2026-01-27",
    time: "5:30 PM — 7:00 PM",
    location: "Choir Room",
    description:
      "Weekly choir rehearsal preparing hymns for the upcoming Sunday service and feast day celebrations.",
    image:
      "https://images.unsplash.com/photo-1560254532-937f0c90838f?w=600&h=400&fit=crop",
    category: "Choir",
  },
  {
    id: 5,
    title: "Women's Fellowship Gathering",
    date: "2026-01-30",
    time: "10:00 AM — 12:00 PM",
    location: "Fellowship Hall",
    description:
      "A time of prayer, encouragement, and community among the women of our parish. Speaker: Deacon's wife Mariam.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    category: "Community",
  },
  {
    id: 6,
    title: "Community Outreach — Feed the Hungry",
    date: "2026-02-01",
    time: "8:00 AM — 1:00 PM",
    location: "Community Center",
    description:
      "Join our monthly outreach program to prepare and distribute meals to those in need across the neighborhood.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
    category: "Charity",
  },
];

export const calendarEvents = [
  {
    title: "Sunday Divine Liturgy",
    start: new Date(2026, 0, 18, 6, 0),
    end: new Date(2026, 0, 18, 12, 0),
    location: "Main Church",
    description: "Full Sunday Kidase with sacred Eucharist.",
  },
  {
    title: "Youth Fellowship Night",
    start: new Date(2026, 0, 23, 18, 0),
    end: new Date(2026, 0, 23, 20, 30),
    location: "Fellowship Hall",
    description: "Worship and discussion for young adults.",
  },
  {
    title: "Bible Study",
    start: new Date(2026, 0, 25, 18, 0),
    end: new Date(2026, 0, 25, 19, 30),
    location: "Church Library",
    description: "Book of Genesis study with Abba Teshale.",
  },
  {
    title: "Choir Practice",
    start: new Date(2026, 0, 27, 17, 30),
    end: new Date(2026, 0, 27, 19, 0),
    location: "Choir Room",
    description: "Weekly rehearsal for upcoming services.",
  },
  {
    title: "Women's Fellowship",
    start: new Date(2026, 0, 30, 10, 0),
    end: new Date(2026, 0, 30, 12, 0),
    location: "Fellowship Hall",
    description: "Prayer and encouragement gathering.",
  },
  {
    title: "Community Outreach",
    start: new Date(2026, 1, 1, 8, 0),
    end: new Date(2026, 1, 1, 13, 0),
    location: "Community Center",
    description: "Feed the Hungry program.",
  },
  {
    title: "Sunday Divine Liturgy",
    start: new Date(2026, 1, 1, 6, 0),
    end: new Date(2026, 1, 1, 12, 0),
    location: "Main Church",
    description: "Full Sunday Kidase.",
  },
  {
    title: "Timkat — Feast of Epiphany",
    start: new Date(2026, 0, 19, 5, 0),
    end: new Date(2026, 0, 19, 15, 0),
    location: "Main Cathedral & Grounds",
    description: "The great feast of the baptism of Jesus Christ.",
  },
  {
    title: "Morning Prayer",
    start: new Date(2026, 0, 19, 6, 0),
    end: new Date(2026, 0, 19, 7, 0),
    location: "Main Church",
    description: "Daily morning prayer service.",
  },
  {
    title: "Evening Prayer",
    start: new Date(2026, 0, 20, 18, 0),
    end: new Date(2026, 0, 20, 19, 0),
    location: "Main Church",
    description: "Evening prayer and vespers.",
  },
  {
    title: "Fasting Day Service",
    start: new Date(2026, 0, 21, 6, 0),
    end: new Date(2026, 0, 21, 7, 30),
    location: "Main Church",
    description: "Wednesday fasting day liturgy.",
  },
  {
    title: "Men's Fellowship",
    start: new Date(2026, 1, 7, 10, 0),
    end: new Date(2026, 1, 7, 12, 0),
    location: "Fellowship Hall",
    description: "Monthly men's prayer and fellowship.",
  },
];

export const feastDays = [
  {
    id: 1,
    name: "Timkat",
    amharic: "ጥምቀት",
    month: "January",
    description:
      "The Feast of Epiphany celebrating the baptism of Jesus Christ in the Jordan River with joyful processions and water blessings.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Fasika",
    amharic: "ፋሲካ",
    month: "March / April",
    description:
      "The Ethiopian Orthodox Easter, the most sacred feast. Celebrated after 55 days of fasting with the joyous resurrection of our Lord.",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Genna",
    amharic: "ገና",
    month: "January",
    description:
      "Ethiopian Christmas celebrated on January 7th, honoring the birth of Jesus Christ with traditional games, hymns, and feasting.",
    image:
      "https://images.unsplash.com/photo-1552384851-6f681b7ebe7a?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Meskel",
    amharic: "መስቀል",
    month: "September",
    description:
      "The Finding of the True Cross, celebrated with the lighting of the Demera bonfire and vibrant community gatherings.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Filseta",
    amharic: "ፍልሰታ",
    month: "August",
    description:
      "The Feast of the Assumption of the Virgin Mary, observed with fasting, prayer, and deep devotion to the Theotokos.",
    image:
      "https://images.unsplash.com/photo-1560254532-937f0c90838f?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Hosanna",
    amharic: "ሆሣዕና",
    month: "March / April",
    description:
      "Palm Sunday commemorating Christ's triumphal entry into Jerusalem, with Processions of palms and festive hymns.",
    image:
      "https://images.unsplash.com/photo-1612937373987-b1b7db233867?w=600&h=400&fit=crop",
  },
];

export const weeklyServices = [
  {
    id: 1,
    title: "Sunday Divine Liturgy",
    time: "6:00 AM — 12:00 PM",
    description: "Full Holy Kidase (Divine Liturgy) with communion, chanting, and incense.",
    icon: "FiSunrise",
  },
  {
    id: 2,
    title: "Morning Prayer",
    time: "6:00 AM — 7:00 AM",
    description: "Daily morning prayers led by the priests with Psalms and intercessions.",
    icon: "FiSun",
  },
  {
    id: 3,
    title: "Evening Prayer",
    time: "6:00 PM — 7:00 PM",
    description: "Vespers and evening prayers, a peaceful end to the day in God's presence.",
    icon: "FiMoon",
  },
  {
    id: 4,
    title: "Bible Study",
    time: "6:00 PM — 7:30 PM (Saturday)",
    description: "In-depth scripture study exploring the Word of God with guided discussion.",
    icon: "FiBookOpen",
  },
  {
    id: 5,
    title: "Youth Fellowship",
    time: "6:00 PM — 8:00 PM (Friday)",
    description: "Worship, fellowship, and faith-building activities for young adults.",
    icon: "FiUsers",
  },
  {
    id: 6,
    title: "Choir Practice",
    time: "5:30 PM — 7:00 PM (Tuesday)",
    description: "Rehearsal of sacred hymns and liturgical chanting in the Ge'ez tradition.",
    icon: "FiMusic",
  },
  {
    id: 7,
    title: "Fasting Day Services",
    time: "6:00 AM — 7:30 AM (Wed & Fri)",
    description: "Special liturgical services on regular fasting days with prayers and Psalms.",
    icon: "FiClock",
  },
];

export const ministries = [
  {
    id: 1,
    title: "Youth Ministry",
    description:
      "Empowering the next generation through faith-based programs, mentorship, and spiritual growth activities.",
    icon: "FiHeart",
  },
  {
    id: 2,
    title: "Sunday School",
    description:
      "Teaching children the foundations of the Ethiopian Orthodox faith through stories, songs, and interactive lessons.",
    icon: "FiBook",
  },
  {
    id: 3,
    title: "Choir Ministry",
    description:
      "Preserving the ancient liturgical music and chanting traditions of the Ethiopian Orthodox Church in all their beauty.",
    icon: "FiMusic",
  },
  {
    id: 4,
    title: "Women's Fellowship",
    description:
      "Building a supportive community of women through prayer, study, service, and meaningful fellowship.",
    icon: "FiUsers",
  },
  {
    id: 5,
    title: "Men's Fellowship",
    description:
      "Strengthening men in their faith through prayer meetings, Bible study, and acts of service.",
    icon: "FiShield",
  },
  {
    id: 6,
    title: "Community Outreach",
    description:
      "Serving our neighbors through food drives, charitable programs, and acts of compassion and love.",
    icon: "FiGlobe",
  },
];

export const categories = [
  {
    id: 1,
    title: "Feast Days",
    icon: "FiStar",
    color: "bg-secondary/10 text-secondary",
  },
  {
    id: 2,
    title: "Sunday Worship",
    icon: "FiSunrise",
    color: "bg-primary/10 text-primary",
  },
  {
    id: 3,
    title: "Bible Study",
    icon: "FiBookOpen",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: 4,
    title: "Youth",
    icon: "FiHeart",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    id: 5,
    title: "Community",
    icon: "FiUsers",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: 6,
    title: "Charity",
    icon: "FiGlobe",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: 7,
    title: "Prayer",
    icon: "FiClock",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: 8,
    title: "Special Programs",
    icon: "FiCalendar",
    color: "bg-teal-500/10 text-teal-600",
  },
];

export const visitData = {
  title: "Visit This Week",
  subtitle: "Join Our Community",
  welcome:
    "You are warmly invited to join our church family for worship and fellowship. Whether you are seeking spiritual guidance or a community of faith, our doors are always open.",
  serviceTimes: [
    { day: "Sunday", time: "6:00 AM — 12:00 PM", service: "Divine Liturgy" },
    { day: "Wednesday", time: "6:00 AM — 7:30 AM", service: "Fasting Day Prayer" },
    { day: "Friday", time: "6:00 AM — 7:30 AM", service: "Fasting Day Prayer" },
    { day: "Saturday", time: "6:00 PM — 7:30 PM", service: "Evening Prayer & Bible Study" },
  ],
  image:
    "https://images.unsplash.com/photo-1768383206344-dfeb4a00b18d?w=1000&h=700&fit=crop",
  imageAlt: "Beautiful Ethiopian Orthodox Church exterior with warm lighting",
};
