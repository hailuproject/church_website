export const heroData = {
  title: 'Contact Us',
  subtitle:
    "We welcome your questions, prayer requests, and visits. Whether you're seeking spiritual guidance or planning to worship with us, we're here to help.",
  churchName: 'Ethiopian Orthodox Tewahedo Church',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ],
  image:
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=1080&fit=crop',
  imageAlt: 'Ethiopian Orthodox Church entrance with warm welcome',
};

export const contactInfo = [
  {
    id: 'address',
    title: 'Visit Us',
    icon: 'location',
    details: [
      { label: 'Address', value: '123 Orthodox Way, Faith City, ST 12345' },
      { label: 'Amharic', value: '\u1260\u1235\u1270\u1308\u1276\u1275 \u1270\u130D\u1260\u1275\u1229 123, \u130A\u1276\u1295\u1324 \u134A\u1273\u1275, \u1320 12345' },
    ],
  },
  {
    id: 'phone',
    title: 'Call Us',
    icon: 'phone',
    details: [
      { label: 'Church Office', value: '(555) 123-4567' },
      { label: 'Emergency Priest', value: '(555) 987-6543' },
      { label: 'Office Hours', value: 'Mon\u2013Fri: 9:00 AM \u2013 5:00 PM' },
    ],
  },
  {
    id: 'email',
    title: 'Email Us',
    icon: 'email',
    details: [
      { label: 'General', value: 'info@ethiopianorthodox.org' },
      { label: 'Youth Ministry', value: 'youth@ethiopianorthodox.org' },
      { label: "Women's Ministry", value: 'women@ethiopianorthodox.org' },
    ],
  },
  {
    id: 'hours',
    title: 'Office Hours',
    icon: 'clock',
    details: [
      { label: 'Monday \u2013 Friday', value: '9:00 AM \u2013 5:00 PM' },
      { label: 'Saturday', value: '10:00 AM \u2013 2:00 PM' },
      { label: 'Sunday', value: '6:00 AM \u2013 1:00 PM' },
    ],
  },
];

export const contactCategories = [
  'General Inquiry',
  'Prayer Request',
  'Volunteer',
  'Media Request',
  'Sacrament Information',
  'Membership',
  'Other',
];

export const quickHighlights = [
  {
    icon: 'smile',
    title: 'Friendly Staff',
    description: 'Our office team is ready to assist you with warmth and care.',
  },
  {
    icon: 'heart',
    title: 'Prayer Support',
    description: 'Share your prayer needs and our community will lift you up.',
  },
  {
    icon: 'clock',
    title: 'Fast Response',
    description: 'We respond to all inquiries within 24\u201348 hours.',
  },
  {
    icon: 'users',
    title: 'Community Assistance',
    description: 'We\u2019re here to help with any church-related needs.',
  },
];

export const mapData = {
  address: '123 Orthodox Way, Faith City, ST 12345',
  phone: '(555) 123-4567',
  email: 'info@ethiopianorthodox.org',
  website: 'www.ethiopianorthodox.org',
  parking: 'Free parking available in the church lot and street parking on Orthodox Way.',
  transit: 'Bus routes 12 and 34 stop within a 2-minute walk of the church.',
  landmark: 'Located two blocks east of Faith City Park, adjacent to the community center.',
  embedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus',
};

export const serviceSchedule = [
  {
    id: 1,
    time: '6:00 AM \u2013 12:00 PM',
    service: 'Sunday Divine Liturgy',
    description: 'The Holy Qiddase celebrated every Sunday with ancient Ge\u0027ez chants and the full liturgical tradition.',
    icon: 'sunday',
  },
  {
    id: 2,
    time: '6:00 AM \u2013 7:30 AM',
    service: 'Morning Prayer',
    description: 'Daily morning prayers (Sawasaw Wangel) held Monday through Friday.',
    icon: 'morning',
  },
  {
    id: 3,
    time: '6:00 PM \u2013 7:30 PM',
    service: 'Evening Prayer',
    description: 'Evening Vespers with Psalms and intercessory prayers every Wednesday and Friday.',
    icon: 'evening',
  },
  {
    id: 4,
    time: '6:00 PM \u2013 8:00 PM',
    service: 'Bible Study',
    description: 'Weekly Bible study exploring the 81-book Ethiopian Orthodox canon with discussion and reflection.',
    icon: 'study',
  },
  {
    id: 5,
    time: '4:00 PM \u2013 6:00 PM',
    service: 'Youth Fellowship',
    description: 'Youth gathering for spiritual growth, activities, and fellowship every Saturday.',
    icon: 'youth',
  },
  {
    id: 6,
    time: '7:00 PM \u2013 9:00 PM',
    service: 'Choir Practice',
    description: 'Choir rehearsal for liturgical hymns and Mezmur every Thursday evening.',
    icon: 'choir',
  },
  {
    id: 7,
    time: 'Varies',
    service: 'Fasting Day Services',
    description: 'Special prayer services on Wednesdays, Fridays, and during the major fasting seasons.',
    icon: 'fasting',
  },
];

export const departments = [
  {
    id: 1,
    name: 'Church Office',
    contact: 'Mrs. Helen Tadesse',
    phone: '(555) 123-4567',
    email: 'office@ethiopianorthodox.org',
    description: 'General inquiries, scheduling, and church administrative matters.',
    icon: 'office',
  },
  {
    id: 2,
    name: 'Priest Office',
    contact: 'Abba Teshale W. Giorgis',
    phone: '(555) 987-6543',
    email: 'abba.teshale@ethiopianorthodox.org',
    description: 'Pastoral care, spiritual guidance, sacrament scheduling, and prayer requests.',
    icon: 'priest',
  },
  {
    id: 3,
    name: 'Youth Ministry',
    contact: 'Brother Daniel A. Tadesse',
    phone: '(555) 456-7890',
    email: 'youth@ethiopianorthodox.org',
    description: 'Programs, retreats, and activities for youth ages 12\u201325.',
    icon: 'youth',
  },
  {
    id: 4,
    name: 'Sunday School',
    contact: 'Mrs. Rahel Desta',
    phone: '(555) 321-6540',
    email: 'sundayschool@ethiopianorthodox.org',
    description: 'Bible-based education for children ages 4\u201312 every Sunday after liturgy.',
    icon: 'school',
  },
  {
    id: 5,
    name: 'Choir Ministry',
    contact: 'Deacon Samuel T. Haile',
    phone: '(555) 654-3210',
    email: 'choir@ethiopianorthodox.org',
    description: 'Liturgical music, hymns, and Mezmur performances for all services.',
    icon: 'choir',
  },
  {
    id: 6,
    name: "Women's Fellowship",
    contact: 'Mrs. Sofya Alemayehu',
    phone: '(555) 789-0123',
    email: 'women@ethiopianorthodox.org',
    description: 'Women\u2019s prayer groups, Bible study, and community outreach programs.',
    icon: 'women',
  },
  {
    id: 7,
    name: "Men's Fellowship",
    contact: 'Mr. Getachew Lemma',
    phone: '(555) 012-3456',
    email: 'men@ethiopianorthodox.org',
    description: "Men's spiritual fellowship, study groups, and service initiatives.",
    icon: 'men',
  },
  {
    id: 8,
    name: 'Charity Ministry',
    contact: 'Deacon Yosef Bekele',
    phone: '(555) 345-6789',
    email: 'charity@ethiopianorthodox.org',
    description: 'Food drives, community support, and charitable outreach programs.',
    icon: 'charity',
  },
];

export const faqs = [
  {
    question: 'What time is Sunday Divine Liturgy?',
    answer: 'Sunday Divine Liturgy (Qiddase) begins at 6:00 AM and typically concludes around 12:00 PM. We encourage visitors to arrive early for the opening prayers. Coffee and fellowship follow the service.',
  },
  {
    question: 'Do I need to register before visiting?',
    answer: 'No registration is required. All are welcome to attend our worship services. Simply arrive before the service begins and our greeters will help you find a seat and provide a service bulletin.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, free parking is available in the church parking lot on Orthodox Way. Additional street parking is available along the surrounding blocks. On major feast days, overflow parking is arranged at the community center.',
  },
  {
    question: 'Can I request prayers online?',
    answer: 'Yes, you can submit prayer requests through our contact form on this page or by calling the church office. Our priests and prayer team will include your intentions in the daily prayers and liturgical commemorations.',
  },
  {
    question: 'How do I schedule a baptism or wedding?',
    answer: 'Please contact the priest\u2019s office directly at (555) 987-6543 or email abba.teshale@ethiopianorthodox.org. Baptisms and weddings require preparation meetings and scheduling at least 30 days in advance.',
  },
  {
    question: 'How can I become a church member?',
    answer: 'To become a member, attend the New Member Orientation held monthly, meet with the priest, and complete the membership registration form. Contact the church office for the next available orientation date.',
  },
];

export const socialLinks = [
  {
    id: 'facebook',
    platform: 'Facebook',
    description: 'Follow us for event updates, photos, and community news.',
    url: 'https://facebook.com/ethiopianorthodox',
    icon: 'facebook',
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    description: 'Watch live services, sermons, and choir performances.',
    url: 'https://youtube.com/ethiopianorthodox',
    icon: 'youtube',
  },
  {
    id: 'telegram',
    platform: 'Telegram',
    description: 'Join our channel for announcements and prayer requests.',
    url: 'https://t.me/ethiopianorthodox',
    icon: 'telegram',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    description: 'Beautiful photos from worship, feasts, and community life.',
    url: 'https://instagram.com/ethiopianorthodox',
    icon: 'instagram',
  },
];

export const visitHighlights = [
  'Friendly Community',
  "Children's Ministry",
  'Parking Available',
  'Accessible Entrance',
  'Coffee & Fellowship',
];
