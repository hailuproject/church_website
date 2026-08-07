import mongoose from 'mongoose';
import config from '../config/index.js';
import Admin from '../models/Admin.js';
import Setting from '../models/Setting.js';
import HomeContent from '../models/HomeContent.js';
import AboutContent from '../models/AboutContent.js';
import { ROLES } from '../constants/index.js';

const seedAdmins = async () => {
  const admins = [
    {
      name: 'Super Admin',
      email: 'superadmin@church.org',
      phone: '+251900000001',
      password: 'SuperAdmin123!',
      role: ROLES.SUPER_ADMIN,
    },
    {
      name: 'Church Admin',
      email: 'admin@church.org',
      phone: '+251900000002',
      password: 'Admin123!',
      role: ROLES.ADMIN,
    },
    {
      name: 'Priest Gebre',
      email: 'priest@church.org',
      phone: '+251900000003',
      password: 'Priest123!',
      role: ROLES.PRIEST,
    },
    {
      name: 'Deacon Dawit',
      email: 'deacon@church.org',
      phone: '+251900000004',
      password: 'Deacon123!',
      role: ROLES.DEACON,
    },
    {
      name: 'Secretary Sara',
      email: 'secretary@church.org',
      phone: '+251900000005',
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
    churchName: 'St. Mary Ethiopian Orthodox Tewahedo Church',
    churchNameAm: 'የቅድስት ማርያም የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን',
    tagline: 'Worship, Fellowship, Service',
    taglineAm: 'አምልኮ ፣ ሕብረት ፣ አገልግሎት',
    phone: '+251900000000',
    email: 'info@church.org',
    address: { street: 'Church Street', city: 'Addis Ababa', country: 'Ethiopia' },
    socialLinks: {
      facebook: 'https://facebook.com/church',
      youtube: 'https://youtube.com/church',
      telegram: 'https://t.me/church',
    },
    languageSettings: {
      defaultLanguage: 'english',
      supportedLanguages: ['english', 'amharic'],
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

const seedHomeContent = async () => {
  const existing = await HomeContent.findOne();
  if (existing) {
    console.log('  = Home content already exists, skipping');
    return;
  }
  await HomeContent.create({
    hero: {
      heading: 'Welcome to St. Mary Church',
      headingAm: 'እንኳን ወደ ቅድስት ማርያም ቤተ ክርስቲያን መጡ',
      slides: [],
    },
    welcome: {
      title: 'A community of faith',
      titleAm: 'የእምነት ማህበረሰብ',
      content: 'Welcome to our church. We are glad you are here.',
      contentAm: 'ወደ ቤተ ክርስቲያናችን እንኳን ደህና መጡ።',
      scripture: 'Matthew 18:20',
    },
    priestWelcome: {
      title: 'A word from our priest',
      titleAm: 'ከካህናችን ቃል',
      content: 'May the peace of our Lord Jesus Christ be with you.',
      contentAm: 'የጌታችን የኢየሱስ ክርስቶስ ሰላም ከእናንተ ጋር ይሁን።',
      priestName: 'Priest Gebre',
      priestTitle: 'Head Priest',
    },
    quickLinks: [],
    announcementSectionTitle: 'Announcements',
    announcementSectionTitleAm: 'ማስታወቂያዎች',
    showLiveStream: true,
    showAnnouncements: true,
    showUpcomingEvents: true,
    showRecentSermons: true,
  });
  console.log('  + Created default home content');
};

const seedAboutContent = async () => {
  const existing = await AboutContent.findOne();
  if (existing) {
    console.log('  = About content already exists, skipping');
    return;
  }
  await AboutContent.create({
    history: {
      title: 'Our History',
      titleAm: 'ታሪካችን',
      content: 'Our church was established to serve the faithful in the spirit of the Ethiopian Orthodox Tewahedo tradition.',
      contentAm: 'ቤተ ክርስቲያናችን የተመሰረተችው በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ትውፊት መንፈስ ምእመናንን ለማገልገል ነው።',
      images: [],
    },
    faith: {
      title: 'Our Faith',
      titleAm: 'እምነታችን',
      content: 'We hold to the Nicene faith, the Seven Sacraments, and the teachings of the Church Fathers.',
      contentAm: 'በኒቅኔዎስ እምነት ፣ በሰባቱ ቅዱሳት ምሥጢራት እና በቤተ ክርስቲያን አበው ትምህርት እንቆያለን።',
      beliefs: ['The Holy Trinity', 'The Incarnation', 'The Seven Sacraments', 'The Theotokos'],
      beliefsAm: ['ቅድስት ሥላሴ', 'ትስብእት', 'ሰባቱ ቅዱሳት ምሥጢራት', 'እመቤታችን'],
    },
    timeline: [],
    serviceHours: [
      { weekday: 'Sunday', name: 'Holy Liturgy', nameAm: 'ቅዳሴ', hours: '6:00 AM - 11:00 AM' },
      { weekday: 'Wednesday', name: 'Prayer & Bible Study', nameAm: 'ጸሎት እና የመጽሐፍ ቅዱስ ጥናት', hours: '6:00 PM - 8:00 PM' },
      { weekday: 'Friday', name: 'Vespers', nameAm: 'የምሽት ጸሎት', hours: '5:00 PM - 6:00 PM' },
    ],
    location: {
      title: 'Find us',
      address: 'Church Street, Addis Ababa, Ethiopia',
      addressAm: 'ቤተ ክርስቲያን መንገድ ፣ አዲስ አበባ ፣ ኢትዮጵያ',
    },
  });
  console.log('  + Created default about content');
};

const destroy = async () => {
  const results = await Promise.all([
    Admin.deleteMany({}),
    Setting.deleteMany({}),
    HomeContent.deleteMany({}),
    AboutContent.deleteMany({}),
  ]);
  console.log(`Destroyed seed data: admins=${results[0].deletedCount}, settings=${results[1].deletedCount}, home=${results[2].deletedCount}, about=${results[3].deletedCount}`);
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
    await seedHomeContent();
    await seedAboutContent();

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
