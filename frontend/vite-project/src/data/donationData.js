export const heroData = {
  title: 'Donate & Giving',
  subtitle:
    "Your generosity supports worship, charitable outreach, youth ministries, church maintenance, and the preservation of the rich traditions of the Ethiopian Orthodox Tewahedo Church.",
  churchName: 'Ethiopian Orthodox Tewahedo Church',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Donate', href: '/donate' },
  ],
  image:
    'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&h=1080&fit=crop',
  imageAlt: 'Candles and cross in Ethiopian Orthodox Church during worship',
};

export const whyGivingMatters = {
  title: 'Every Gift Makes a Difference',
  description:
    'Your generous donations support our worship services, charitable outreach programs, youth development initiatives, and the ongoing maintenance of our sacred church facilities. Every contribution, no matter the size, helps sustain the spiritual life of our community.',
  image:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop',
  imageAlt: 'Church community gathered together in fellowship and worship',
  features: [
    {
      icon: 'ministries',
      title: 'Church Ministries',
      description: 'Supporting worship services, liturgical music, and spiritual programs.',
    },
    {
      icon: 'outreach',
      title: 'Community Outreach',
      description: 'Feeding the hungry, clothing the needy, and serving our neighbors.',
    },
    {
      icon: 'youth',
      title: 'Youth Development',
      description: 'Nurturing the next generation through education and fellowship.',
    },
    {
      icon: 'maintenance',
      title: 'Church Maintenance',
      description: 'Preserving our sacred facilities for future generations.',
    },
  ],
};

export const givingOptions = [
  {
    id: 'general',
    title: 'General Offering',
    description:
      'Support the overall operations and ministries of our church through your faithful general offering.',
    icon: 'offering',
    suggestedAmounts: [10, 25, 50, 100],
  },
  {
    id: 'tithe',
    title: 'Tithe (Asrat)',
    description:
      'Give a tenth of your income as an act of obedience and gratitude, following the biblical principle of tithing.',
    icon: 'tithe',
    suggestedAmounts: [25, 50, 100, 250],
  },
  {
    id: 'building',
    title: 'Building Fund',
    description:
      'Contribute to the expansion and renovation of our church facilities to accommodate our growing community.',
    icon: 'building',
    suggestedAmounts: [50, 100, 250, 500],
  },
  {
    id: 'mission',
    title: 'Mission Fund',
    description:
      'Support missionary work, church planting, and evangelism efforts both locally and internationally.',
    icon: 'mission',
    suggestedAmounts: [25, 50, 100, 200],
  },
  {
    id: 'memorial',
    title: 'Memorial Gift',
    description:
      'Honor the memory of a loved one with a memorial donation to support the church\u0027s ministries.',
    icon: 'memorial',
    suggestedAmounts: [25, 50, 100, 250],
  },
  {
    id: 'campaign',
    title: 'Special Campaign',
    description:
      'Direct your gift to a specific campaign or initiative currently being championed by the church.',
    icon: 'campaign',
    suggestedAmounts: [20, 50, 100, 500],
  },
];

export const donationTypes = ['General Offering', 'Tithe', 'Building Fund', 'Mission Fund', 'Memorial Gift', 'Special Campaign'];

export const frequencyOptions = ['One Time', 'Weekly', 'Monthly', 'Annually'];

export const trustFeatures = [
  {
    icon: 'lock',
    title: 'Secure Donations',
    description: 'All transactions are encrypted and processed through secure payment gateways.',
  },
  {
    icon: 'clock',
    title: 'One-time Giving',
    description: 'Make a single donation at any time with just a few clicks.',
  },
  {
    icon: 'repeat',
    title: 'Recurring Giving',
    description: 'Set up automatic weekly, monthly, or annual donations.',
  },
  {
    icon: 'receipt',
    title: 'Tax Receipt',
    description: 'Receive an official donation receipt for tax purposes.',
  },
  {
    icon: 'heart',
    title: 'Prayer Support',
    description: 'Your prayer requests are shared with our pastoral team.',
  },
];

export const impacts = [
  { amount: 25, description: 'Provides church supplies for one week.' },
  { amount: 50, description: 'Supports a family in need with groceries.' },
  { amount: 100, description: 'Supports youth ministry programs for a month.' },
  { amount: 250, description: 'Maintains church facilities for one month.' },
  { amount: 500, description: 'Supports mission outreach for one quarter.' },
];

export const campaign = {
  title: 'Church Expansion Project',
  description:
    'Help us expand our church facilities to accommodate our growing congregation. The new wing will include additional worship space, a community hall, and expanded Sunday School classrooms.',
  raised: 87500,
  goal: 150000,
  daysRemaining: 42,
  image:
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
  imageAlt: 'Church expansion architectural rendering',
};

export const monthlyDonationData = [
  { month: 'Jul', donations: 12400 },
  { month: 'Aug', donations: 15200 },
  { month: 'Sep', donations: 18900 },
  { month: 'Oct', donations: 16700 },
  { month: 'Nov', donations: 21300 },
  { month: 'Dec', donations: 28500 },
  { month: 'Jan', donations: 19800 },
  { month: 'Feb', donations: 22100 },
  { month: 'Mar', donations: 24600 },
  { month: 'Apr', donations: 26300 },
  { month: 'May', donations: 23900 },
  { month: 'Jun', donations: 27200 },
];

export const donationCategoryData = [
  { name: 'General Offering', value: 35, color: '#8B0000' },
  { name: 'Tithe', value: 28, color: '#D4AF37' },
  { name: 'Building Fund', value: 18, color: '#16A34A' },
  { name: 'Mission Fund', value: 12, color: '#A52A2A' },
  { name: 'Other', value: 7, color: '#6B7280' },
];

export const statistics = [
  { label: 'Total Donations', value: '$247,800', icon: 'dollar' },
  { label: 'Active Donors', value: '312', icon: 'users' },
  { label: 'Monthly Giving', value: '$27,200', icon: 'calendar' },
  { label: 'Campaign Progress', value: '58%', icon: 'chart' },
];

export const givingMethods = [
  {
    id: 'card',
    title: 'Credit / Debit Card',
    description: 'Donate securely using Visa, Mastercard, or American Express.',
    icon: 'card',
    badge: 'Available',
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'Direct bank transfer to the church\u0027s designated account.',
    icon: 'bank',
    badge: 'Available',
  },
  {
    id: 'mobile',
    title: 'Mobile Banking',
    description: 'Give through your mobile banking app with instant confirmation.',
    icon: 'mobile',
    badge: 'Available',
  },
  {
    id: 'cash',
    title: 'Cash at Church',
    description: 'Bring your offering in person during any worship service.',
    icon: 'cash',
    badge: 'Available',
  },
  {
    id: 'telebirr',
    title: 'Telebirr',
    description: 'Send your donation directly through Ethiopia\u0027s leading mobile money platform.',
    icon: 'telebirr',
    badge: 'Available',
  },
  {
    id: 'chapa',
    title: 'Chapa',
    description: 'Donate through Chapa, Ethiopia\u0027s trusted online payment gateway.',
    icon: 'chapa',
    badge: 'Available',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Ato Daniel Bekele',
    role: 'Church Elder',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    testimony:
      'Giving to our church has been a blessing to my family. Knowing that our tithes support the worship, outreach, and youth programs gives us great joy and fulfillment.',
  },
  {
    id: 2,
    name: 'W/ro Hanna Tesfaye',
    role: "Women's Fellowship Leader",
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    testimony:
      'Through the generosity of our congregation, we\u0027ve been able to serve hundreds of families in need. Every donation makes a real difference in our community.',
  },
  {
    id: 3,
    name: 'Brother Yonatan Alemayehu',
    role: 'Youth Ministry Volunteer',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    testimony:
      'The youth programs funded by church donations have transformed the lives of our young people. I\u0027ve seen firsthand how giving changes futures.',
  },
];

export const faqs = [
  {
    question: 'Is online giving secure?',
    answer: 'Yes, all online donations are processed through encrypted, PCI-compliant payment gateways. We use industry-standard security measures to protect your financial information. Your data is never stored on our servers.',
  },
  {
    question: 'Can I give anonymously?',
    answer: 'Absolutely. When filling out the donation form, simply check the "Anonymous Donation" option. Your gift will be recorded for tax purposes but your name will not be publicly displayed or shared.',
  },
  {
    question: 'Can I make recurring donations?',
    answer: 'Yes, you can set up automatic recurring donations on a weekly, monthly, or annual basis. This is a convenient way to give consistently and help the church plan its budget effectively.',
  },
  {
    question: 'Will I receive a donation receipt?',
    answer: 'Yes, you will receive an official donation receipt via email for every contribution. These receipts can be used for tax deduction purposes. Annual giving statements are also available upon request.',
  },
  {
    question: 'Can I donate to a specific ministry?',
    answer: 'Yes, you can direct your donation to a specific fund or ministry by selecting the appropriate giving option in the donation form. If you have a specific fund in mind, please contact the church office.',
  },
  {
    question: 'How are church funds used?',
    answer: 'Church funds are used for worship services, pastoral care, charitable outreach, youth and children\u0027s ministries, church maintenance, community programs, mission work, and educational initiatives. A detailed annual financial report is shared with the congregation.',
  },
];

export const scriptureVerse = {
  text: 'Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.',
  reference: '2 Corinthians 9:7',
};
