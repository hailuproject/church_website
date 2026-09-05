import mongoose from 'mongoose';
import config from '../config/index.js';
import Admin from '../models/Admin.js';
import Setting from '../models/Setting.js';
import ChurchContent from '../models/ChurchContent.js';
import Resource from '../models/Resource.js';
import { ROLES } from '../constants/index.js';

const ADDRESS = '4808 W 99th St, Inglewood, CA 90301, United States';
const MAP_QUERY = '4808 W 99th St, Inglewood, CA 90301';

const seedAdmins = async () => {
  const admins = [
    {
      name: 'Super Admin',
      email: 'superadmin@church.org',
      phone: '',
      password: 'SuperAdmin123!',
      role: ROLES.SUPER_ADMIN,
    },
    {
      name: 'Church Admin',
      email: 'admin@church.org',
      phone: '',
      password: 'Admin123!',
      role: ROLES.ADMIN,
    },
    {
      name: 'Priest Admin',
      email: 'priest@church.org',
      phone: '',
      password: 'Priest123!',
      role: ROLES.PRIEST,
    },
    {
      name: 'Deacon Admin',
      email: 'deacon@church.org',
      phone: '',
      password: 'Deacon123!',
      role: ROLES.DEACON,
    },
    {
      name: 'Secretary Admin',
      email: 'secretary@church.org',
      phone: '',
      password: 'Secretary123!',
      role: ROLES.SECRETARY,
    },
  ];

  let created = 0;
  let skipped = 0;

  for (const admin of admins) {
    const existing = await Admin.findOne({ email: admin.email });
    if (existing) {
      skipped += 1;
      continue;
    }
    await Admin.create({ ...admin, isVerified: true, isActive: true });
    created += 1;
    console.log(`  + Created ${admin.role}: ${admin.email}`);
  }

  return { created, skipped };
};

const seedSettings = async () => {
  const existing = await Setting.findOne().sort({ createdAt: -1 });
  if (existing) {
    console.log('  = Settings already exist, skipping');
    return;
  }
  await Setting.create({
    churchName: 'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church',
    churchNameAm: 'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን',
    churchNameTi: 'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን',
    tagline: 'Worship, Fellowship, Service',
    taglineAm: 'አምልኮ ፣ ሕብረት ፣ አገልግሎት',
    taglineTi: 'ኣምልኾ፡ ሕብረት፡ ኣገልግሎት',
    phone: '',
    email: '',
    address: {
      street: '4808 W 99th St',
      city: 'Inglewood',
      region: 'CA',
      country: 'United States',
      postalCode: '90301',
    },
    addressAm: {
      street: '4808 ደብልዩ 99ኛ ስትሪት',
      city: 'ኢንግልውድ',
      region: 'CA',
      country: 'ዩናይትድ ስቴትስ',
      postalCode: '90301',
    },
    addressTi: {
      street: '4808 ዌስት 99ኛ ስትሪት',
      city: 'ኢንግልውድ',
      region: 'CA',
      country: 'ዩናይትድ ስቴትስ',
      postalCode: '90301',
    },
    footerText:
      'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church, a community of faith in Los Angeles, California.',
    footerTextAm:
      'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን፣ በሎስ አንጀለስ፣ ካሊፎርኒያ የምትገኝ የእምነት ማህበረሰብ።',
    footerTextTi:
      'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን በሎስ አንጀለስ፣ ካሊፎርኒያ የሚገኝ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን ማህበረሰብ ነው።',
    socialLinks: {
      facebook: '',
      youtube: '',
      telegram: '',
      instagram: '',
      twitter: '',
      tiktok: '',
    },
    languageSettings: {
      defaultLanguage: 'english',
      supportedLanguages: ['english', 'amharic', 'tigrigna'],
      allowLanguageSwitch: true,
    },
    theme: {
      primaryColor: '#8B6F47',
      secondaryColor: '#2c3e50',
      fontFamily: 'Georgia',
      darkMode: false,
    },
  });
  console.log('  + Created default church settings');
};

const CONTENT_DEFAULTS = {
  home: {
    hero: {
      heading: 'Welcome to Holy Trinity – Gebre Christos Church',
      headingAm: 'እንኳን ወደ ቅዱሳት ሦስት – ገብረ ክርስቶስ ቤተክርስቲያን ደህና መጡ',
      headingTi: 'እንቋዕ ናብ ቅድስት ሥላሴ – ገብረ ክርስቶስ ቤተ ክርስትያን መጻእኩም',
      tagline: 'A community of faith in Los Angeles, California',
      taglineAm: 'በሎስ አንጀለስ፣ ካሊፎርኒያ የእምነት ማህበረሰብ',
      taglineTi: 'በሎስ አንጀለስ፣ ካሊፎርኒያ የሚገኝ የእምነት ማህበረሰብ ነው።',
      primaryCta: {
        label: 'Plan Your Visit',
        labelAm: 'ጉብኝትዎን ያቅዱ',
        labelTi: 'ጉብኝትኩም ኣቐዲምኩም ጽዓዉ',
        href: '/visit',
      },
      secondaryCta: { label: 'Donate', labelAm: 'ለግሱ', labelTi: 'ለገሱ', href: '/donate' },
      image: null,
    },
    intro: {
      title: 'Welcome to our church',
      titleAm: 'እንኳን ወደ ቤተክርስቲያናችን ደህና መጡ',
      titleTi: 'እንቋዕ ናብ ቤተ ክርስትያንና መጻእኩም',
      content:
        'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church is a community of faith serving the faithful in Los Angeles, California, in the spirit of the Ethiopian Orthodox Tewahedo tradition.',
      contentAm:
        'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በሎስ አንጀለስ፣ ካሊፎርኒያ የሚገኙትን ምእመናን በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ትውፊት መንፈስ የምታገለግል የእምነት ማህበረሰብ ናት።',
      contentTi:
        'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን በሎስ አንጀለስ፣ ካሊፎርኒያ የሚገኝ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን ማህበረሰብ ነው።',
    },
    showUpcomingEvents: true,
    showLatestSermons: true,
    showGalleryPreview: true,
    cta: {
      title: 'Come Worship With Us',
      titleAm: 'ከእኛ ጋር ለማምለክ ይምጡ',
      titleTi: 'ምሳና ክትሰግዱ ንዕድም',
      content: 'We would love to welcome you to our church community.',
      contentAm: 'ወደ ቤተክርስቲያን ማህበረሰባችን በክፍት ልብ እንቀበላችኋለን።',
      contentTi: 'ናብ ማሕበረሰብ ቤተ ክርስትያንና ብልቢባሬት ንቕበለኩም።',
      buttonLabel: 'Contact Us',
      buttonLabelAm: 'ያግኙን',
      buttonLabelTi: 'ኣግንኡና',
      buttonHref: '/contact',
    },
  },
  about: {
    intro: {
      title: 'About Our Church',
      titleAm: 'ስለ ቤተክርስቲያናችን',
      titleTi: 'ብዛዕባ ቤተ ክርስትያንና',
      content:
        'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church is a congregation of the Ethiopian Orthodox Tewahedo Church in Los Angeles, California.',
      contentAm:
        'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን በሎስ አንጀለስ፣ ካሊፎርኒያ የሚገኝ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን ማህበረሰብ ነው።',
      contentTi:
        'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን በሎስ አንጀለስ፣ ካሊፎርኒያ የሚገኝ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን ማህበረሰብ ነው።',
    },
    history: {
      title: 'Our History',
      titleAm: 'ታሪካችን',
      titleTi: 'ታሪኽና',
      content: '',
    },
    location: {
      title: 'Our Location',
      titleAm: 'ያለንበት ቦታ',
      titleTi: 'ዝርከብና ቦታ',
      address: ADDRESS,
      addressAm: '4808 ደብልዩ 99ኛ ስትሪት፣ ኢንግልውድ፣ ካሊፎርኒያ 90301፣ ዩናይትድ ስቴትስ',
      addressTi: '4808 ዌስት 99ኛ ስትሪት፣ ኢንግልውድ፣ ካሊፎርኒያ 90301፣ ዩናይትድ ስቴትስ',
      mapQuery: MAP_QUERY,
    },
  },
  contact: {
    intro: {
      title: 'Get In Touch',
      titleAm: 'ይገናኙ',
      titleTi: 'ርኸቡና',
      content: 'Send us a message using the form below and we will get back to you.',
      contentAm: 'ከታች ባለው ቅጽ መልእክት ይላኩልን እና እንመልስልዎታለን።',
      contentTi: 'ኣብ ታሕቲ ዘሎ ቅጥዕ መልእኽቲ ስደዱልና ኣነ ከነምልሰልኩም ኢና።',
    },
    address: ADDRESS,
    phone: '',
    email: '',
    hours: [],
    mapQuery: MAP_QUERY,
    showForm: true,
  },
  donate: {
    intro: {
      title: 'Support Our Church',
      titleAm: 'ቤተክርስቲያናችንን ይደግፉ',
      titleTi: 'ቤተ ክርስትያንና ድገፍ ግበሩ',
      content: 'Your generosity helps our church continue its mission of worship, fellowship, and service.',
      contentAm: 'ልግስናዎ ቤተክርስቲያናችን የአምልኮ፣ የኅብረት እና የአገልግሎት ተልዕኮዋን እንድትቀጥል ይረዳል።',
      contentTi: 'ልግስናኹም ቤተ ክርስትያንና ተልእኽኦ ኣምልኾ፡ ሕብረትን ኣገልግሎትን ክትቅጽል ይሕግዝ።',
    },
    methods: [],
    contactNote: '',
  },
  footer: {
    aboutText:
      'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church, a community of faith in Los Angeles, California.',
    aboutTextAm:
      'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን፣ በሎስ አንጀለስ፣ ካሊፎርኒያ የምትገኝ የእምነት ማህበረሰብ።',
    aboutTextTi:
      'የቅድስት ሥላሴ ገብረ ክርስቶስ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን በሎስ አንጀለስ፣ ካሊፎርኒያ የሚገኝ የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን ማህበረሰብ ነው።',
  },
};

const seedContent = async () => {
  let created = 0;
  let skipped = 0;
  for (const [key, data] of Object.entries(CONTENT_DEFAULTS)) {
    const existing = await ChurchContent.findOne({ key });
    if (existing) {
      skipped += 1;
      continue;
    }
    await ChurchContent.create({ key, data, version: 1 });
    created += 1;
    console.log(`  + Created content: ${key}`);
  }
  return { created, skipped };
};

const RESOURCE_DEFAULTS = [
  {
    title: 'The Orthodox Faith: An Introduction',
    titleAm: 'የኦርቶዶክስ እምነት፡ መግቢያ',
    titleTi: 'ኦርቶዶክሳዊት እምነት፡ መእተዊ',
    description:
      'A concise introduction to the doctrine, worship, and traditions of the Ethiopian Orthodox Tewahedo Church.',
    descriptionAm:
      'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን አስተምህሮ፣ አምልኮ እና ትውፊቶችን አጭር መግቢያ።',
    descriptionTi:
      'ስለ ኣስተምህሮ፡ ኣምልኾን ትውፊታትን ኢትዮጵያዊት ኦርቶዶክስ ተዋሕዶ ቤተ ክርስትያን ሓጺር መእተዊ።',
    category: 'Books',
    language: 'English',
  },
  {
    title: 'Orthodox Prayer Book',
    titleAm: 'የኦርቶዶክስ ጸሎት መጽሐፍ',
    titleTi: 'መጽሓፍ ጸሎት ኦርቶዶክስ',
    description: 'Morning, evening, and occasional prayers drawn from the daily office of the Church.',
    descriptionAm: 'ከቤተክርስቲያን የዕለት ተዕለት ሰዓታት የተወሰዱ የጧት፣ የማታ እና የልዩ ጊዜ ጸሎቶች።',
    descriptionTi: 'ካብ መዓልታዊ ስርዓት ሰዓታት ቤተ ክርስትያን እተወስዱ ጸሎታት ንግሆ፡ ምሸትን ንልዕለ-ኣጋጣሚታትን።',
    category: 'Prayers',
    language: 'Both',
  },
  {
    title: 'Zema: Hymns of the Church',
    titleAm: 'ዜማ፡ የቤተክርስቲያን መዝሙራት',
    titleTi: 'ዜማ፡ መዝሙራት ቤተ ክርስትያን',
    description: 'An overview of the traditional Ge\u0027ez chant tradition and its three modes.',
    descriptionAm: 'የባህላዊ የግዕዝ ዜማ ትውፊት እና ሦስቱ የዜማ ዘዴዎች አጠቃላይ እይታ።',
    descriptionTi: 'ሓጺር ኣጠቃላይ እይታ ብዛዕባ ባህላዊ ዝማሬ ግእዝን ሰለስተ ስልታቱን።',
    category: 'Hymns',
    language: 'Amharic',
  },
  {
    title: 'The Psalms of David',
    titleAm: 'መዝሙረ ዳዊት',
    titleTi: 'መዝሙር ዳዊት',
    description: 'The 151 psalms of the Ethiopian canon used in prayer and worship.',
    descriptionAm: 'በጸሎት እና በአምልኮ የሚገለገሉት የኢትዮጵያ ቀኖና ፻፶፩ መዝሙራት።',
    descriptionTi: 'እቶም ኣብ ጸሎትን ኣምልኾን ዝጥቀሙ ፻፶፩ መዝሙራት ካኖን ኢትዮጵያ።',
    category: 'Scriptures',
    language: 'English',
  },
  {
    title: 'The Divine Liturgy Explained',
    titleAm: 'ቅዳሴ በማብራሪያ',
    titleTi: 'ቅዳሴ ብማስረዳእታ',
    description: 'A step-by-step guide to the order, prayers, and symbolism of the Divine Liturgy.',
    descriptionAm: 'የቅዳሴን ሥርዓት፣ ጸሎቶች እና ምሳሌያዊ ትርጉም ደረጃ በደረጃ የሚያብራራ መመሪያ።',
    descriptionTi: 'ደረጃ ብደረጃ ዘብራራ መምርሒ ብዛዕባ ስርዓት፡ ጸሎታትን ምሳሌያዊ ስነ-ትርጉምን ቅዳሴ።',
    category: 'Liturgy',
    language: 'Both',
  },
  {
    title: 'Hymns and Spiritual Songs: Audio Collection',
    titleAm: 'መዝሙራት እና መንፈሳዊ ዜማዎች፡ የድምጽ ስብስብ',
    titleTi: 'መዝሙራትን መንፈሳዊ ዜማታትን፡ ድምጻዊ ስብስብ',
    description: 'Recorded hymns of the Church for listening, study, and worship at home.',
    descriptionAm: 'ለማዳመጥ፣ ለጥናት እና ለቤት አምልኮ የተመዘገቡ የቤተክርስቲያን መዝሙራት።',
    descriptionTi: 'ንምስማዕ፡ ንመጽናዕትን ንኣምልኾ ገዛን እተመዝገቡ መዝሙራት ቤተ ክርስትያን።',
    category: 'Music',
    language: 'Amharic',
  },
  {
    title: 'The History of the Ethiopian Orthodox Church',
    titleAm: 'የኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያን ታሪክ',
    titleTi: 'ታሪኽ ኢትዮጵያዊት ኦርቶዶክስ ቤተ ክርስትያን',
    description: 'From the conversion of Aksum to the modern diaspora communities.',
    descriptionAm: 'ከአክሱም ክርስትና መቀበል አንስቶ እስከ ዘመናዊ ዲያስፖራ ማህበረሰቦች ድረስ።',
    descriptionTi: 'ካብ ቅብኣት ክርስትና ኣኽሱም ክሳብ ዘመናውያን ማሕበረሰባት ዳያስፖራ።',
    category: 'Books',
    language: 'English',
  },
  {
    title: 'Fasting Calendar 2026',
    titleAm: 'የጾም ካላንደር 2026',
    titleTi: 'ካሌንደር ጾም 2026',
    description: 'A printable calendar of all fasting seasons and holy days.',
    descriptionAm: 'የሁሉም የጾም ወቅቶች እና የበዓላት ቀናት ማተሚያ ካላንደር።',
    descriptionTi: 'እተሓትመ ካሌንደር ኩሉ ወቕታት ጾምን ቅዱሳት መዓልትታትን።',
    category: 'Books',
    language: 'English',
  },
  {
    title: "Children's Faith Workbook",
    titleAm: 'የልጆች የእምነት መልመጃ መጽሐፍ',
    titleTi: 'መጽሓፍ ዕዮ እምነት ቆልዑ',
    description: 'Stories, activities, and lessons for young disciples.',
    descriptionAm: 'ለወጣት ደቀ መዛሙርት ታሪኮች፣ ተግባራት እና ትምህርቶች።',
    descriptionTi: 'ማዕረ፡ ንጥፈታትን ትምህርትታትን ንኣናእሽቱ ደቀ መዛሙርት።',
    category: 'Books',
    language: 'English',
  },
  {
    title: 'Morning and Evening Prayers',
    titleAm: 'የጧትና የማታ ጸሎቶች',
    titleTi: 'ጸሎታት ንግሆን ምሸትን',
    description: 'The daily office prayers of the Church for personal devotion.',
    descriptionAm: 'ለግል ምስጋና የሚያገለግሉ የቤተክርስቲያን ዕለታዊ የሰዓት ጸሎቶች።',
    descriptionTi: 'መዓልታዊ ጸሎታት ሰዓት ቤተ ክርስትያን ንብሕትውና ኣምልኾ።',
    category: 'Prayers',
    language: 'Both',
  },
  {
    title: 'Prayers for the Sick and the Grieving',
    titleAm: 'የታመሙት እና የሐዘንተኞች ጸሎት',
    titleTi: 'ጸሎታት ንሕሙማትን ሕዙናን',
    description: 'Prayers of comfort and healing for those in need.',
    descriptionAm: 'ለተቸገሩ የማጽናኛ እና የመፈወሻ ጸሎቶች።',
    descriptionTi: 'ጸሎታት መጽናዕን ፍውስን ንዘለዉግን ዝደልዩ።',
    category: 'Prayers',
    language: 'Amharic',
  },
  {
    title: 'Holy Week Services',
    titleAm: 'የሕማማት ሥርዓት',
    titleTi: 'ስርዓታት ሕማማት',
    description: 'The order of services from Palm Sunday through the Passion and Resurrection.',
    descriptionAm: 'ከሆሣዕና እስከ ሕማማት እና ትንሳኤ ድረስ ያለው የሥርዓት ቅደም ተከተል።',
    descriptionTi: 'ቅደም ተኸትሎ ስርዓታት ካብ ሆሳዕና ክሳብ ሕማማትን ትንሳኤን።',
    category: 'Liturgy',
    language: 'Both',
  },
  {
    title: 'The Feasts of the Church',
    titleAm: 'የቤተክርስቲያን በዓላት',
    titleTi: 'በዓላት ቤተ ክርስትያን',
    description: 'The major and minor feast days that shape the Ethiopian Church year.',
    descriptionAm: 'የኢትዮጵያ ቤተክርስቲያን ዓመትን የሚቀርጹት ዋና እና ታናሽ የበዓላት ቀናት።',
    descriptionTi: 'እተን ዓመት ቤተ ክርስትያን ዝቕርጻ ዓበይትን ንኣሽቱን መዓልትታት በዓል።',
    category: 'Liturgy',
    language: 'English',
  },
  {
    title: 'Lenten Prayers',
    titleAm: 'የጾም ጸሎቶች',
    titleTi: 'ጸሎታት ዓብይ ጾም',
    description: 'Prayers, hymns, and readings appointed for the season of Great Lent.',
    descriptionAm: 'ለዐቢይ ጾም ወቅት የተወሰኑ ጸሎቶች፣ መዝሙራት እና ንባቦች።',
    descriptionTi: 'ንወቕቲ ዓብይ ጾም እተሰርዑ ጸሎታት፡ መዝሙራትን ንባባትን።',
    category: 'Liturgy',
    language: 'Both',
  },
  {
    title: 'Church Newsletter Archive',
    titleAm: 'የቤተክርስቲያን ጋዜጣ ማህደር',
    titleTi: 'ማህደር ጋዜጣ ቤተ ክርስትያን',
    description: 'Past issues of our parish newsletter and announcements.',
    descriptionAm: 'ያለፉ የቤተክርስቲያናችን ጋዜጣዎች እና ማስታወቂያዎች።',
    descriptionTi: 'ዝሓለፉ ጋዜጣታትን ሓበሬታትን ጽዋዕና።',
    category: 'Other',
    language: 'English',
  },
];

const seedResources = async () => {
  let created = 0;
  let skipped = 0;
  for (const resource of RESOURCE_DEFAULTS) {
    const existing = await Resource.findOne({ title: resource.title });
    if (existing) {
      skipped += 1;
      continue;
    }
    await Resource.create({
      ...resource,
      file: { format: resource.category === 'Music' ? 'mp3' : 'pdf' },
      isPublished: true,
    });
    created += 1;
  }
  console.log(`  + Resources: ${created} created, ${skipped} already exist`);
  return { created, skipped };
};

const destroy = async () => {
  const results = await Promise.all([
    Admin.deleteMany({}),
    Setting.deleteMany({}),
    ChurchContent.deleteMany({}),
  ]);
  console.log(
    `Destroyed seed data: admins=${results[0].deletedCount}, settings=${results[1].deletedCount}, content=${results[2].deletedCount}`
  );
};

const seed = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log('Connected to MongoDB');

    if (process.argv.includes('--destroy')) {
      await destroy();
      return;
    }

    const adminResult = await seedAdmins();
    console.log(`  Admins: ${adminResult.created} created, ${adminResult.skipped} already exist`);

    await seedSettings();
    const contentResult = await seedContent();
    console.log(`  Content: ${contentResult.created} created, ${contentResult.skipped} already exist`);

    const resourceResult = await seedResources();
    console.log(`  Resources: ${resourceResult.created} created, ${resourceResult.skipped} already exist`);

    console.log('\nSeed completed successfully.');
    console.log('\nDefault accounts (email / password):');
    console.log('  superadmin@church.org / SuperAdmin123!');
    console.log('  admin@church.org / Admin123!');
    console.log('  priest@church.org / Priest123!');
    console.log('  deacon@church.org / Deacon123!');
    console.log('  secretary@church.org / Secretary123!');
    console.log('\nIMPORTANT: Change these passwords after first login.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
