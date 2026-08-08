import mongoose from 'mongoose';
import config from '../config/index.js';
import Admin from '../models/Admin.js';
import Setting from '../models/Setting.js';
import ChurchContent from '../models/ChurchContent.js';
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
    tagline: 'Worship, Fellowship, Service',
    taglineAm: 'አምልኮ ፣ ሕብረት ፣ አገልግሎት',
    phone: '',
    email: '',
    address: {
      street: '4808 W 99th St',
      city: 'Inglewood',
      region: 'CA',
      country: 'United States',
      postalCode: '90301',
    },
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

const CONTENT_DEFAULTS = {
  home: {
    hero: {
      heading: 'Welcome to Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church',
      tagline: 'A community of faith in Los Angeles, California',
      primaryCta: { label: 'Plan Your Visit', href: '/contact' },
      secondaryCta: { label: 'Donate', href: '/donate' },
      image: null,
    },
    intro: {
      title: 'Welcome to our church',
      content:
        'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church is a community of faith serving the faithful in Los Angeles, California, in the spirit of the Ethiopian Orthodox Tewahedo tradition.',
    },
    showUpcomingEvents: true,
    showLatestSermons: true,
    showGalleryPreview: true,
    cta: {
      title: 'Come Worship With Us',
      content: 'We would love to welcome you to our church community.',
      buttonLabel: 'Contact Us',
      buttonHref: '/contact',
    },
  },
  about: {
    intro: {
      title: 'About Our Church',
      content:
        'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church is a congregation of the Ethiopian Orthodox Tewahedo Church in Los Angeles, California.',
    },
    history: {
      title: 'Our History',
      content: '',
    },
    location: {
      title: 'Our Location',
      address: ADDRESS,
      mapQuery: MAP_QUERY,
    },
  },
  contact: {
    intro: {
      title: 'Get In Touch',
      content: 'Send us a message using the form below and we will get back to you.',
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
      content: 'Your generosity helps our church continue its mission of worship, fellowship, and service.',
    },
    methods: [],
    contactNote: '',
  },
  footer: {
    aboutText:
      'Holy Trinity – Gebre Christos Ethiopian Orthodox Tewahedo Church, a community of faith in Los Angeles, California.',
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
