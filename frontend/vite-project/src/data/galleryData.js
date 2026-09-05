export const heroData = {
  title: 'Gallery',
  subtitle:
    'Experience the beauty of worship, sacred traditions, feast celebrations, and community life through our collection of photographs and videos.',
  churchName: 'Ethiopian Orthodox Tewahedo Church',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
  ],
  image: '',
  imageAlt: '',
};

export const galleryCategories = [
  {
    id: 'feast-days',
    title: 'Feast Days',
    titleAm: 'የበዓላት ቀናት',
    titleTi: 'መዓልትታት በዓላት',
    count: 0,
    description: 'Celebrations of Timkat, Meskel, Fasika, and other major feasts.',
    descriptionAm: 'የጥምቀት፣ የመስቀል፣ የፋሲካ እና የሌሎች ዋና ዋና በዓላት ክብረ በዓላት።',
    descriptionTi: 'ዓብይታት ጥምቀት፣ መስቀል፣ ፋሲካን ካልኦት ዓበይቲ በዓላትን።',
    icon: 'feast',
  },
  {
    id: 'church-interior',
    title: 'Church Interior',
    titleAm: 'የቤተ ክርስቲያን ውስጥ',
    titleTi: 'ውሽጢ ቤተ ክርስትያን',
    count: 0,
    description: 'Sacred spaces, altar views, and architectural details.',
    descriptionAm: 'ቅዱሳን ስፍራዎች፣ የመሠዊያ እይታዎች እና የሕንፃ ጥበብ ዝርዝሮች።',
    descriptionTi: 'ቅዱሳት ቦታታት፡ ትርኢት መሰውኢን ዝርዝር ህንጻታትን።',
    icon: 'interior',
  },
  {
    id: 'community-events',
    title: 'Community Events',
    titleAm: 'የማህበረሰብ ዝግጅቶች',
    titleTi: 'ማሕበረሰባዊ ፍጻመታት',
    count: 0,
    description: 'Fellowship gatherings, dinners, and community activities.',
    descriptionAm: 'የሕብረት ስብሰባዎች፣ የእራት ግብዣዎች እና የማህበረሰብ ተግባራት።',
    descriptionTi: 'ዕላማታት ሕብረት፡ ራትያትን ማሕበረሰባዊ ምውዕያታትን።',
    icon: 'community',
  },
  {
    id: 'clergy',
    title: 'Clergy & Staff',
    titleAm: 'ቀሳውስት እና ሠራተኞች',
    titleTi: 'ቀሳውስትን ሰራተንን',
    count: 0,
    description: 'Our priests, deacons, and church leadership.',
    descriptionAm: 'ካህናቶቻችን፣ ዲያቆናት እና የቤተ ክርስቲያን አመራሮች።',
    descriptionTi: 'መማንስትና፡ ዲያቆናትን መራሕቲ ቤተ ክርስትያንን።',
    icon: 'clergy',
  },
  {
    id: 'history',
    title: 'Church History',
    titleAm: 'የቤተ ክርስቲያን ታሪክ',
    titleTi: 'ታሪኽ ቤተ ክርስትያን',
    count: 0,
    description: 'Historic moments and the journey of our parish.',
    descriptionAm: 'ታሪካዊ ጊዜያት እና የመራህያናችን ጉዞ።',
    descriptionTi: 'ታሪኻዊ ግዝያትን ጉዕዞ ጽዕዋናን።',
    icon: 'history',
  },
  {
    id: 'choir',
    title: 'Choir',
    titleAm: 'መዘምራን',
    titleTi: 'ዘማሪታት',
    count: 0,
    description: 'Our choir in worship, concerts, and performances.',
    descriptionAm: 'መዘምራኖቻችን በአምልኮ፣ በኮንሰርት እና በትዕይንት።',
    descriptionTi: 'ዘማሪታትና ኣብ ኣምልኾ፡ ኮንሰርትን ምርኢታትን።',
    icon: 'choir',
  },
  {
    id: 'youth',
    title: 'Youth Ministry',
    titleAm: 'የወጣቶች አገልግሎት',
    titleTi: 'ኣገልግሎት መንእሰያት',
    count: 0,
    description: 'Youth conferences, retreats, and programs.',
    descriptionAm: 'የወጣቶች ጉባኤዎች፣ ማፈግፈግ እና ፕሮግራሞች።',
    descriptionTi: 'ጉባኤ፡ ምልስላስን መደባት መንእሰያትን።',
    icon: 'youth',
  },
  {
    id: 'charity',
    title: 'Charity & Outreach',
    titleAm: 'በጎ አድራጎት እና ማዳረስ',
    titleTi: 'ሕዝባዊ ሓገዝን ቅልል ወጻእን',
    count: 0,
    description: 'Service to the community and charitable works.',
    descriptionAm: 'ለማህበረሰቡ አገልግሎት እና በጎ ሥራዎች።',
    descriptionTi: 'ኣገልግሎት ንማሕበረሰብ፡ ዕዮታት ሕዝባዊ ሓገዝ።',
    icon: 'charity',
  },
];

export const galleryFilterTabs = [
  { id: 'All', en: 'All', am: 'ሁሉም', ti: 'ኩሉ' },
  { id: 'Worship', en: 'Worship', am: 'አምልኮ', ti: 'ኣምልኾ' },
  { id: 'Feast Days', en: 'Feast Days', am: 'የበዓላት ቀናት', ti: 'መዓልትታት በዓላት' },
  { id: 'Community', en: 'Community', am: 'ማህበረሰብ', ti: 'ማሕበረሰብ' },
  { id: 'Church', en: 'Church', am: 'ቤተ ክርስቲያን', ti: 'ቤተ ክርስትያን' },
  { id: 'Choir', en: 'Choir', am: 'መዘምራን', ti: 'ዘማሪታት' },
  { id: 'Youth', en: 'Youth', am: 'ወጣቶች', ti: 'መንእሰያት' },
  { id: 'Charity', en: 'Charity', am: 'በጎ አድራጎት', ti: 'ሕዝባዊ ሓገዝ' },
];

export const timeline = [];

export const sacredMoments = [
  {
    id: 1,
    title: 'Holy Communion',
    titleTi: 'ቅዱስ ቁርባን',
    description:
      'The sacred mystery of the Eucharist, where the faithful receive the Body and Blood of Our Lord Jesus Christ.',
    descriptionTi:
      'ቅዱስ ምሥጢር ቁርባን፡ እቶም ምእመናን ሥጋን ደምን ጐይታና ኢየሱስ ክርስቶስ ዝቕበሉሉ።',
    image: '',
  },
  {
    id: 2,
    title: 'Baptism',
    titleTi: 'ጥምቀት',
    description:
      'The holy sacrament of initiation into the Ethiopian Orthodox Church.',
    descriptionTi:
      'ቅዱስ ምሥጢር ምእታት ናብ ኢትዮጵያዊት ኦርቶዶክስ ቤተ ክርስትያን።',
    image: '',
  },
  {
    id: 3,
    title: 'Wedding Ceremony',
    titleTi: 'ሥርዓት መርዓ',
    description:
      'The blessed union of two souls in the presence of God, celebrated with ancient prayers and sacred rites.',
    descriptionTi:
      'ሕቡርነት ክልተ ነፍስታት ኣብ ቅድሚ ኣምላኽ፡ ብጥንታዊ ጸሎታትን ቅዱሳት ሥርዓታትን ዝኽበር።',
    image: '',
  },
  {
    id: 4,
    title: 'Prayer Service',
    titleTi: 'ኣገልግሎት ጸሎት',
    description:
      'The beauty of communal prayer, with ancient Ge\u0027ez chants and the incense rising to heaven.',
    descriptionTi:
      'ውበት ማሕበረሰባዊ ጸሎት፡ ምስ ጥንታዊ ዝማሬ ግእዝን ዕጣን ናብ ሰማይ ዝዕርግን።',
    image: '',
  },
];

export const communityHighlights = [];

export const statistics = [];
