export const heroData = {
  title: 'Resources',
  subtitle:
    'Explore a rich collection of Ethiopian Orthodox spiritual resources, Holy Scriptures, prayer guides, liturgical texts, fasting calendars, and educational materials to strengthen your faith.',
  churchName: 'Ethiopian Orthodox Tewahedo Church',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
  ],
  image:
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop',
  imageAlt: 'Church library with ancient books and scriptures',
};

export const featuredResource = {
  title: 'Introduction to Ethiopian Orthodox Christianity',
  category: 'PDF',
  description:
    'A comprehensive guide to the history, beliefs, practices, and spiritual traditions of the Ethiopian Orthodox Tewahedo Church. This resource covers the apostolic origins, the 81 books of the canon, the sacraments, fasting traditions, and the rich liturgical heritage that defines our faith.',
  language: 'English / Amharic',
  pages: 128,
  author: 'Department of Religious Education',
  updatedDate: '2026-01-15',
  downloads: 2340,
  image:
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
  imageAlt: 'Ethiopian Orthodox theology book on a wooden table',
};

export const resourceCategories = [
  {
    id: 'bible',
    title: 'Holy Bible',
    description: 'The complete 81-book Ethiopian canon with study notes and cross references.',
    count: 12,
    icon: 'bible',
  },
  {
    id: 'prayer',
    title: 'Prayer Guides',
    description: 'Morning, evening, and seasonal prayer guides for daily spiritual practice.',
    count: 18,
    icon: 'prayer',
  },
  {
    id: 'liturgy',
    title: 'Liturgical Texts',
    description: 'Divine Liturgy, Ge\u0027ez hymns, and sacred service texts.',
    count: 15,
    icon: 'liturgy',
  },
  {
    id: 'theology',
    title: 'Theology',
    description: 'Deep explorations of Ethiopian Orthodox doctrine and patristic writings.',
    count: 9,
    icon: 'theology',
  },
  {
    id: 'study',
    title: 'Bible Study',
    description: 'Weekly study guides, discussion questions, and reading plans.',
    count: 24,
    icon: 'study',
  },
  {
    id: 'fasting',
    title: 'Fasting Calendar',
    description: 'Complete fasting calendars with guides for each season.',
    count: 6,
    icon: 'fasting',
  },
  {
    id: 'saints',
    title: 'Saints',
    description: 'Biographies and hagiographies of Ethiopian Orthodox saints.',
    count: 21,
    icon: 'saints',
  },
  {
    id: 'downloads',
    title: 'Downloads',
    description: 'Printable PDFs, children\u0027s materials, and choir resources.',
    count: 30,
    icon: 'downloads',
  },
];

export const resources = [
  {
    id: 1,
    title: 'Holy Bible (81 Books)',
    description: 'The complete Ethiopian Orthodox canon including all 81 books with Ge\u0027ez, Amharic, and English translations.',
    category: 'Bible',
    language: 'Amharic / English',
    fileType: 'PDF',
    downloads: 5420,
    image:
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop',
    imageAlt: 'Open Holy Bible on a reading stand',
  },
  {
    id: 2,
    title: 'Morning Prayer Guide',
    description: 'A comprehensive guide to the morning prayers (Sawasaw Wangel) including Psalms, litanies, and intercessions.',
    category: 'Prayer',
    language: 'Amharic',
    fileType: 'PDF',
    downloads: 3890,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    imageAlt: 'Candles burning during morning prayer',
  },
  {
    id: 3,
    title: 'Evening Prayer Guide',
    description: 'Evening prayer services with the Psalms of Vespers (Enderase Wangel) and Compline prayers.',
    category: 'Prayer',
    language: 'Amharic',
    fileType: 'PDF',
    downloads: 3210,
    image:
      'https://images.unsplash.com/photo-1549687880-f68be654594c?w=600&h=400&fit=crop',
    imageAlt: 'Evening prayer with oil lamps',
  },
  {
    id: 4,
    title: 'Ge\u0027ez Divine Liturgy',
    description: 'The full Qiddase text in Ge\u0027ez with Amharic and English translations for understanding the Holy Liturgy.',
    category: 'Bible',
    language: 'Ge\u0027ez / Amharic',
    fileType: 'PDF',
    downloads: 2780,
    image:
      'https://images.unsplash.com/photo-1552384851-6f681b7ebe7a?w=600&h=400&fit=crop',
    imageAlt: 'Ethiopian Orthodox liturgical cross',
  },
  {
    id: 5,
    title: 'Nicene Creed',
    description: 'The Nicene Creed as professed by the Ethiopian Orthodox Church with theological commentary.',
    category: 'Study',
    language: 'English',
    fileType: 'PDF',
    downloads: 4100,
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
    imageAlt: 'Church interior with sacred artwork',
  },
  {
    id: 6,
    title: 'Fasting Calendar',
    description: 'Complete annual fasting calendar with durations, recipes, and spiritual guidelines for each period.',
    category: 'Prayer',
    language: 'English / Amharic',
    fileType: 'PDF',
    downloads: 6200,
    image:
      'https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=600&h=400&fit=crop',
    imageAlt: 'Calendar with fasting dates marked',
  },
  {
    id: 7,
    title: 'Life of Saint Tekle Haymanot',
    description: 'The inspiring hagiography of Saint Tekle Haymanot, the founder of Ethiopian monasticism.',
    category: 'Study',
    language: 'Amharic',
    fileType: 'PDF',
    downloads: 1890,
    image:
      'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=600&h=400&fit=crop',
    imageAlt: 'Monastery perched on a mountain cliff',
  },
  {
    id: 8,
    title: 'Ethiopian Orthodox Catechism',
    description: 'A systematic presentation of the faith for catechumens and new members preparing for baptism and communion.',
    category: 'Study',
    language: 'Amharic / English',
    fileType: 'PDF',
    downloads: 2560,
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop',
    imageAlt: 'Stack of theological study books',
  },
];

export const resourceFilters = ['All', 'PDF', 'Audio', 'Video', 'Books', 'Prayer', 'Bible', 'Study'];

export const bibleStudyFeatures = [
  {
    icon: 'weekly',
    title: 'Weekly Study Guide',
    description: 'Structured weekly lessons covering Old and New Testament books with Ge\u0027ez word studies.',
  },
  {
    icon: 'discussion',
    title: 'Discussion Questions',
    description: 'Thoughtful questions for small group discussions and personal reflection.',
  },
  {
    icon: 'memory',
    title: 'Memory Verses',
    description: 'Key Scripture passages to memorize each week, strengthening your walk with Christ.',
  },
  {
    icon: 'reading',
    title: 'Reading Plans',
    description: 'Structured reading plans through the entire 81-book Ethiopian canon in one year.',
  },
];

export const prayerResources = [
  {
    id: 1,
    title: 'Morning Prayer',
    description: 'Begin your day with the sacred morning prayers, Psalms of Dawit, and the Jesus Prayer.',
    icon: 'sunrise',
  },
  {
    id: 2,
    title: 'Evening Prayer',
    description: 'Close your day with the evening Vespers and the prayers of thanksgiving and repentance.',
    icon: 'sunset',
  },
  {
    id: 3,
    title: 'Prayer Before Communion',
    description: 'Preparation prayers and confession before receiving the Holy Eucharist (Qiddase).',
    icon: 'communion',
  },
  {
    id: 4,
    title: 'Prayer for the Sick',
    description: 'Intercessory prayers for healing and comfort for the sick and suffering in our community.',
    icon: 'healing',
  },
  {
    id: 5,
    title: 'Prayer During Fasting',
    description: 'Special prayers and litanies observed during the great fasting seasons of the Church.',
    icon: 'fasting',
  },
  {
    id: 6,
    title: 'Family Prayer',
    description: 'A complete guide for families to pray together, including prayers for children and household.',
    icon: 'family',
  },
];

export const liturgicalResources = [
  {
    id: 1,
    title: 'Divine Liturgy (Qiddase)',
    description: 'The complete text of the Holy Liturgy of Saint John Chrysostom as celebrated in the Ethiopian tradition, with rubrical notes and explanations.',
    icon: 'liturgy',
  },
  {
    id: 2,
    title: 'Ge\u0027ez Hymns',
    description: 'A collection of traditional Ge\u0027ez hymns (Mezmur) used in the divine services, with transliterations and translations.',
    icon: 'hymns',
  },
  {
    id: 3,
    title: 'Psalms (Dawit)',
    description: 'The 150 Psalms of David as used in the Ethiopian liturgical tradition, with cantillation marks and musical notation.',
    icon: 'psalms',
  },
  {
    id: 4,
    title: 'Feast Day Readings',
    description: 'Scripture readings, epistles, and Gospel passages for all major feast days throughout the liturgical year.',
    icon: 'feast',
  },
  {
    id: 5,
    title: 'Holy Week Services',
    description: 'Complete service texts for Holy Week (Simeona), from Palm Sunday through the Paschal Vigil.',
    icon: 'holyweek',
  },
  {
    id: 6,
    title: 'Lenten Services',
    description: 'Special prayer services and readings for the 55-day Great Lent (Hudade) period.',
    icon: 'lent',
  },
];

export const fastingPeriods = [
  {
    id: 1,
    name: 'Great Lent (Hudade)',
    duration: '55 Days',
    month: 'February \u2013 April',
    description: 'The most sacred fasting season commemorating the 40 days Christ fasted in the wilderness, extended to 55 days in the Ethiopian tradition.',
  },
  {
    id: 2,
    name: 'Fast of Nineveh',
    duration: '3 Days',
    month: 'January',
    description: 'A three-day commemorative fast recalling the repentance of the people of Nineveh after the preaching of Prophet Jonah.',
  },
  {
    id: 3,
    name: "Apostles' Fast",
    duration: '14 Days',
    month: 'June',
    description: 'A two-week fast honoring the holy Apostles, observed between the Feast of All Apostles and the Feast of Saint Peter and Saint Paul.',
  },
  {
    id: 4,
    name: 'Dormition Fast (Filseta)',
    duration: '15 Days',
    month: 'August',
    description: 'A fifteen-day fast in honor of the Dormition of the Blessed Virgin Mary, observed from August 1 through August 15.',
  },
  {
    id: 5,
    name: 'Nativity Fast',
    duration: '40 Days',
    month: 'November \u2013 January',
    description: 'A forty-day fast preparing for the celebration of the Nativity of Our Lord Jesus Christ (Genna).',
  },
  {
    id: 6,
    name: 'Wednesday & Friday Fast',
    duration: 'Weekly',
    yearRound: 'Year-round',
    description: 'Weekly commemoration of Judas\u0027s betrayal (Wednesday) and the crucifixion of Christ (Friday), observed throughout the year.',
  },
];

export const saints = [
  {
    id: 1,
    name: 'Saint Frumentius',
    subtitle: 'Abba Selama',
    description: 'The first Bishop of Ethiopia, sent by Saint Athanasius of Alexandria in 330 AD. He evangelized the Kingdom of Aksum and established the apostolic succession in Ethiopia.',
    image:
      'https://images.unsplash.com/photo-1552384851-6f681b7ebe7a?w=600&h=400&fit=crop',
    imageAlt: 'Ancient Ethiopian cross honoring Saint Frumentius',
  },
  {
    id: 2,
    name: 'Saint Tekle Haymanot',
    subtitle: 'Father of Ethiopian Monasticism',
    description: 'A 13th-century monk who founded the Debre Libanos monastery and is celebrated for his extraordinary asceticism and devotion to prayer.',
    image:
      'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=600&h=400&fit=crop',
    imageAlt: 'Mountain monastery of Debre Libanos',
  },
  {
    id: 3,
    name: 'Saint Yared',
    subtitle: 'Father of Ethiopian Sacred Music',
    description: 'The 6th-century deacon who created the three traditional Ethiopian musical modes (Ge\u0027ez, Ezel, and Araray) used in liturgical chanting to this day.',
    image:
      'https://images.unsplash.com/photo-1560254532-937f0c90838f?w=600&h=400&fit=crop',
    imageAlt: 'Ethiopian choir performing traditional liturgical music',
  },
  {
    id: 4,
    name: 'Saint George',
    subtitle: 'Patron of Ethiopia',
    description: 'The dragon-slaying warrior saint deeply venerated in Ethiopian tradition, with the famous rock-hewn church of Lalibela dedicated to his honor.',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
    imageAlt: 'Church of Saint George in Lalibela',
  },
  {
    id: 5,
    name: 'Saint Mary',
    subtitle: 'The Blessed Virgin',
    description: 'The Theotokos, Mother of God, deeply honored in Ethiopian tradition. The Church of Our Lady Mary of Zion in Aksum is believed to house the Ark of the Covenant.',
    image:
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop',
    imageAlt: 'Icon of the Blessed Virgin Mary in Ethiopian tradition',
  },
  {
    id: 6,
    name: 'The Nine Saints',
    subtitle: 'Founders of Ethiopian Monasticism',
    description: 'Nine holy monks from Syria and Constantinople who arrived in the 5th century, established monasteries, and preserved the Ge\u0027ez liturgical tradition.',
    image:
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=400&fit=crop',
    imageAlt: 'Ancient Ethiopian monastery in the highlands',
  },
];

export const downloads = [
  {
    id: 1,
    title: 'Prayer Book PDF',
    description: 'Complete Ethiopian Orthodox prayer book with morning, evening, and seasonal prayers.',
    fileSize: '4.2 MB',
    language: 'Amharic / English',
    icon: 'book',
  },
  {
    id: 2,
    title: 'Bible PDF',
    description: 'The complete 81-book Ethiopian Orthodox Holy Bible in Amharic and English.',
    fileSize: '18.5 MB',
    language: 'Amharic',
    icon: 'bible',
  },
  {
    id: 3,
    title: 'Fasting Calendar PDF',
    description: 'Printable annual fasting calendar with all major and minor fasting days marked.',
    fileSize: '1.1 MB',
    language: 'English',
    icon: 'calendar',
  },
  {
    id: 4,
    title: "Children's Lessons",
    description: 'Age-appropriate Bible stories and lessons for Sunday School children aged 5\u201312.',
    fileSize: '6.8 MB',
    language: 'Amharic / English',
    icon: 'children',
  },
  {
    id: 5,
    title: 'Choir Music',
    description: 'Sheet music and audio files for traditional Ethiopian Orthodox liturgical hymns and Mezmur.',
    fileSize: '22.3 MB',
    language: 'Ge\u0027ez / Amharic',
    icon: 'music',
  },
  {
    id: 6,
    title: 'Church Magazine',
    description: 'Quarterly church magazine featuring articles on faith, community news, and spiritual reflections.',
    fileSize: '8.4 MB',
    language: 'Amharic',
    icon: 'magazine',
  },
];

export const faqs = [
  {
    question: 'Can I download these resources?',
    answer: 'Yes, all resources listed on this page are available for free download. Simply click the download button on any resource card to save it to your device. Some resources are available in PDF format, while others may be in audio or text format.',
  },
  {
    question: 'Are resources available in Amharic?',
    answer: 'Yes, many of our resources are available in both Amharic and English. Some liturgical texts are also available in Ge\u0027ez, the ancient liturgical language of the Ethiopian Orthodox Church. Each resource listing indicates the available languages.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No, you do not need to create an account to access or download any of our resources. Everything is freely available to all visitors as part of our mission to share the spiritual heritage of the Ethiopian Orthodox Tewahedo Church.',
  },
  {
    question: 'Are these resources free?',
    answer: 'Absolutely. All resources on this page are completely free of charge. Our church provides these materials as a service to the faithful and to anyone interested in learning more about the Ethiopian Orthodox faith.',
  },
  {
    question: 'Can I share downloaded materials?',
    answer: 'Yes, we encourage you to share these resources with family, friends, and your church community. The purpose of these materials is to spread the knowledge of our faith and strengthen the spiritual life of the faithful.',
  },
  {
    question: 'How often are resources updated?',
    answer: 'We review and update our resources quarterly. Liturgical texts, fasting calendars, and study guides are updated to reflect the current liturgical year. New resources are added regularly based on community needs and requests.',
  },
];
