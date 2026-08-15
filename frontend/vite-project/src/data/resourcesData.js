export const heroData = {
  title: 'Resources',
  subtitle:
    'Explore spiritual resources, Holy Scriptures, prayer guides, and educational materials to strengthen your faith.',
  churchName: 'Ethiopian Orthodox Tewahedo Church',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
  ],
  image: '',
  imageAlt: '',
};

export const featuredResource = null;

export const resourceCategories = [
  {
    id: 'bible',
    title: 'Holy Bible',
    titleAm: 'መጽሐፍ ቅዱስ',
    description: 'The Ethiopian Orthodox canon with study notes.',
    descriptionAm: 'የኢትዮጵያ ኦርቶዶክስ ካኖን ከጥናት ማስታወሻዎች ጋር።',
    count: 0,
    icon: 'bible',
  },
  {
    id: 'prayer',
    title: 'Prayer Guides',
    titleAm: 'የጸሎት መመሪያዎች',
    description: 'Prayer guides for daily spiritual practice.',
    descriptionAm: 'ለዕለታዊ መንፈሳዊ ልምምድ የጸሎት መመሪያዎች።',
    count: 0,
    icon: 'prayer',
  },
  {
    id: 'liturgy',
    title: 'Liturgical Texts',
    titleAm: 'የቅዳሴ ጽሑፎች',
    description: 'Divine Liturgy, Ge\u0027ez hymns, and sacred service texts.',
    descriptionAm: 'ቅዳሴ፣ የግዕዝ መዝሙራት እና የቅዱስ አገልግሎት ጽሑፎች።',
    count: 0,
    icon: 'liturgy',
  },
  {
    id: 'theology',
    title: 'Theology',
    titleAm: 'የነገረ መለኮት',
    description: 'Ethiopian Orthodox doctrine and patristic writings.',
    descriptionAm: 'የኢትዮጵያ ኦርቶዶክስ ትምህርት እና የአበው ጽሑፎች።',
    count: 0,
    icon: 'theology',
  },
  {
    id: 'study',
    title: 'Bible Study',
    titleAm: 'የመጽሐፍ ቅዱስ ጥናት',
    description: 'Study guides, discussion questions, and reading plans.',
    descriptionAm: 'የጥናት መመሪያዎች፣ የውይይት ጥያቄዎች እና የንባብ መርሃ ግብሮች።',
    count: 0,
    icon: 'study',
  },
  {
    id: 'fasting',
    title: 'Fasting Calendar',
    titleAm: 'የጾም ቀን መቁጠሪያ',
    description: 'Fasting calendars with guides for each season.',
    descriptionAm: 'ለእያንዳንዱ ወቅት ከመመሪያ ጋር የጾም ቀን መቁጠሪያዎች።',
    count: 0,
    icon: 'fasting',
  },
  {
    id: 'saints',
    title: 'Saints',
    titleAm: 'ቅዱሳን',
    description: 'Biographies and hagiographies of Ethiopian Orthodox saints.',
    descriptionAm: 'የኢትዮጵያ ኦርቶዶክስ ቅዱሳን የሕይወት ታሪኮች እና ገድላት።',
    count: 0,
    icon: 'saints',
  },
  {
    id: 'downloads',
    title: 'Downloads',
    titleAm: 'ውርዶች',
    description: 'Printable PDFs and educational materials.',
    descriptionAm: 'የሚታተሙ ፒዲኤፍዎች እና የትምህርት ቁሳቁሶች።',
    count: 0,
    icon: 'downloads',
  },
];

export const resources = [];

export const resourceFilters = [
  { id: 'All', en: 'All', am: 'ሁሉም' },
  { id: 'PDF', en: 'PDF', am: 'PDF' },
  { id: 'Audio', en: 'Audio', am: 'ድምጽ' },
  { id: 'Video', en: 'Video', am: 'ቪዲዮ' },
  { id: 'Books', en: 'Books', am: 'መጻሕፍት' },
  { id: 'Prayer', en: 'Prayer', am: 'ጸሎት' },
  { id: 'Bible', en: 'Bible', am: 'መጽሐፍ ቅዱስ' },
  { id: 'Study', en: 'Study', am: 'ጥናት' },
];

export const bibleStudyFeatures = [];

export const prayerResources = [];

export const liturgicalResources = [];

export const fastingPeriods = [
  {
    id: 1,
    name: 'Great Lent (Hudade)',
    nameAm: 'ዐቢይ ጾም (ሕዳዴ)',
    duration: '55 Days',
    durationAm: '፶፭ ቀናት',
    month: 'February \u2013 April',
    monthAm: 'የካቲት \u2013 ሚያዝያ',
    description: 'The most sacred fasting season, commemorating the 40 days Christ fasted in the wilderness, extended to 55 days in the Ethiopian tradition.',
    descriptionAm: 'በጣም የተቀደሰው የጾም ወቅት፣ ክርስቶስ በምድረ በዳ የጾመውን ፵ ቀን የሚያስታውስ፣ በኢትዮጵያ ትውፊት ወደ ፶፭ ቀናት የተራዘመ።',
  },
  {
    id: 2,
    name: 'Fast of Nineveh',
    nameAm: 'የነነዌ ጾም',
    duration: '3 Days',
    durationAm: '፫ ቀናት',
    month: 'January',
    monthAm: 'ጥር',
    description: 'A three-day commemorative fast recalling the repentance of the people of Nineveh after the preaching of Prophet Jonah.',
    descriptionAm: 'የነቢዩ ዮናስ ስብከት በኋላ የነነዌ ሕዝብ ንስሐ የሚያስታውስ የሦስት ቀን የመታሰቢያ ጾም።',
  },
  {
    id: 3,
    name: "Apostles' Fast",
    nameAm: 'የሐዋርያት ጾም',
    duration: '14 Days',
    durationAm: '፲፬ ቀናት',
    month: 'June',
    monthAm: 'ሰኔ',
    description: 'A two-week fast honoring the holy Apostles, observed between the Feast of All Apostles and the Feast of Saint Peter and Saint Paul.',
    descriptionAm: 'ቅዱሳን ሐዋርያትን የሚያከብር የሁለት ሳምንት ጾም፣ በጠቅላላ የሐዋርያት በዓል እና በቅዱስ ጴጥሮስና ጳውሎስ በዓል መካከል ይከበራል።',
  },
  {
    id: 4,
    name: 'Dormition Fast (Filseta)',
    nameAm: 'የነሐሴ ጾም (ፍልሰታ)',
    duration: '15 Days',
    durationAm: '፲፭ ቀናት',
    month: 'August',
    monthAm: 'ነሐሴ',
    description: 'A fifteen-day fast in honor of the Dormition of the Blessed Virgin Mary, observed in August.',
    descriptionAm: 'የእመቤታችን የቅድስት ድንግል ማርያም ፍልሰታ የሚያከብር፣ በነሐሴ ወር የሚከበር የአሥራ አምስት ቀን ጾም።',
  },
  {
    id: 5,
    name: 'Nativity Fast',
    nameAm: 'የገና ጾም',
    duration: '40 Days',
    durationAm: '፵ ቀናት',
    month: 'November \u2013 January',
    monthAm: 'ሕዳር \u2013 ጥር',
    description: 'A forty-day fast preparing for the celebration of the Nativity of Our Lord Jesus Christ (Genna).',
    descriptionAm: 'የጌታችን የኢየሱስ ክርስቶስ ልደት (ገና) በዓልን ለማክበር የሚዘጋጅ የአርባ ቀን ጾም።',
  },
  {
    id: 6,
    name: 'Wednesday & Friday Fast',
    nameAm: 'የረቡዕ እና የዓርብ ጾም',
    duration: 'Weekly',
    durationAm: 'ሳምንታዊ',
    yearRound: 'Year-round',
    yearRoundAm: 'ዓመት ሙሉ',
    description: 'Weekly commemoration of Judas\u2019s betrayal (Wednesday) and the crucifixion of Christ (Friday), observed throughout the year.',
    descriptionAm: 'የይሁዳ ክህደት (ረቡዕ) እና የክርስቶስ ስቅለት (ዓርብ) ሳምንታዊ መታሰቢያ፣ ዓመት ሙሉ ይከበራል።',
  },
];

export const saints = [
  {
    id: 1,
    name: 'Saint Frumentius',
    nameAm: 'ቅዱስ ፍሬምናጦስ',
    subtitle: 'Abba Selama',
    subtitleAm: 'አባ ሰላማ',
    description: 'The first Bishop of Ethiopia, ordained in the 4th century AD. He evangelized the Kingdom of Aksum and established the apostolic succession in Ethiopia.',
    descriptionAm: 'በ፬ኛው ክፍለ ዘመን ዓ.ም. የተሾመ የኢትዮጵያ የመጀመሪያ ጳጳስ። የአክሱም መንግሥትን በማስተማር የሐዋርያት ውርስን በኢትዮጵያ አቋቋሙ።',
    image: '',
    imageAlt: '',
  },
  {
    id: 2,
    name: 'Saint Tekle Haymanot',
    nameAm: 'ቅዱስ ተክለ ሃይማኖት',
    subtitle: 'Father of Ethiopian Monasticism',
    subtitleAm: 'የኢትዮጵያ ገዳማዊ ሕይወት አባት',
    description: 'A 13th-century monk who founded the Debre Libanos monastery and is celebrated for his extraordinary asceticism and devotion to prayer.',
    descriptionAm: 'በ፲፫ኛው ክፍለ ዘመን የደብረ ሊባኖስ ገዳምን የመሠረተ መነኩሴ፤ በልዩ ጾምና በጸሎት ታዋቂ።',
    image: '',
    imageAlt: '',
  },
  {
    id: 3,
    name: 'Saint Yared',
    nameAm: 'ቅዱስ ያሬድ',
    subtitle: 'Father of Ethiopian Sacred Music',
    subtitleAm: 'የኢትዮጵያ ቅዱስ ዜማ አባት',
    description: 'The 6th-century deacon who created the three traditional Ethiopian musical modes (Ge\u0027ez, Ezel, and Araray) used in liturgical chanting to this day.',
    descriptionAm: 'የ፮ኛው ክፍለ ዘመን ዲያቆን፤ እስከ ዛሬ ድረስ በቅዳሴ ዘማዊነት የሚያገለግሉትን ሦስቱን የዜማ ዘዴዎች (ግዕዝ፣ ዕዝል፣ ዐራራይ) ፈጠረ።',
    image: '',
    imageAlt: '',
  },
  {
    id: 4,
    name: 'Saint George',
    nameAm: 'ቅዱስ ጊዮርጊስ',
    subtitle: 'Patron of Ethiopia',
    subtitleAm: 'የኢትዮጵያ ጠባቂ',
    description: 'The warrior saint deeply venerated in Ethiopian tradition, with the famous rock-hewn church of Lalibela dedicated to his honor.',
    descriptionAm: 'በኢትዮጵያ ትውፊት በጥልቀት የሚከበር የጦር ቅዱስ፤ ታዋቂው የላሊበላ በዐለ ቅርጸ ተጠርቷል።',
    image: '',
    imageAlt: '',
  },
  {
    id: 5,
    name: 'Saint Mary',
    nameAm: 'እመቤታችን ቅድስት ድንግል ማርያም',
    subtitle: 'The Blessed Virgin',
    subtitleAm: 'ድንግል',
    description: 'The Theotokos, Mother of God, deeply honored in Ethiopian tradition. The Church of Our Lady Mary of Zion in Aksum is venerated as the resting place of the Ark of the Covenant.',
    descriptionAm: 'የእግዚአብሔር እናት የሆነችው እመቤታችን በኢትዮጵያ ትውፊት በታላቅ ክብር ትከበራለች። በአክሱም የሚገኘው የእመቤታችን የጽዮን ቤተ ክርስቲያን የቃል ኪዳኑ ታቦት ማደሪያ ተደርጎ ይከበራል።',
    image: '',
    imageAlt: '',
  },
  {
    id: 6,
    name: 'The Nine Saints',
    nameAm: 'ዘጠኙ ቅዱሳን',
    subtitle: 'Founders of Ethiopian Monasticism',
    subtitleAm: 'የኢትዮጵያ ገዳማዊ ሕይወት መሥራቾች',
    description: 'Nine holy monks from Syria and Constantinople who arrived in the 5th century, established monasteries, and preserved the Ge\u0027ez liturgical tradition.',
    descriptionAm: 'በ፭ኛው ክፍለ ዘመን ከሶርያ እና ከቁስጥንጥንያ የመጡ ዘጠኝ ቅዱሳን መነኮሳት፤ ገዳማትን መሥርተው የግዕዝ ቅዳሴ ትውፊትን ጠብቀዋል።',
    image: '',
    imageAlt: '',
  },
];

export const downloads = [];

export const faqs = [];
