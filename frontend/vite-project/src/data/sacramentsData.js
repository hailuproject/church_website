import {
  FiDroplet,
  FiBookOpen,
  FiHeart,
  FiHome,
  FiUser,
  FiSun,
  FiStar,
  FiCheck,
  FiClock,
  FiBook,
} from 'react-icons/fi';

export const heroData = {
  title: 'Holy Sacraments',
  subtitle:
    "Experience God's grace through the sacred mysteries of the Ethiopian Orthodox Tewahedo Church.",
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Sacraments', href: '/sacraments' },
  ],
};

export const introductionData = {
  title: 'The Seven Holy Mysteries',
  paragraphs: [
    'The Holy Sacraments, known as the Holy Mysteries, are sacred acts through which God bestows His grace upon the faithful. These divine institutions were established by Christ Himself and have been preserved in the Ethiopian Orthodox Tewahedo Church since the time of the Apostles.',
    'Each mystery is a visible sign of invisible grace, connecting the believer to the life of the Holy Trinity. Through these sacred rites, the faithful experience transformation, healing, and communion with God.',
    'The Ethiopian Orthodox Tewahedo Church maintains the ancient practice of administering these mysteries with reverence, deep prayer, and the rich liturgical traditions passed down through centuries of unbroken faith.',
  ],
  image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&h=600&fit=crop',
  imageAlt: 'Interior of an Ethiopian Orthodox Church with sacred paintings',
};

export const sacraments = [
  {
    id: 'baptism',
    name: 'Baptism',
    amharic: 'ጥምቀት',
    description:
      'The sacrament of initiation into the Christian faith. Through the water of baptism, the faithful are reborn in Christ, cleansed from original sin, and united with the body of the Church.',
    icon: FiDroplet,
    image: 'https://images.unsplash.com/photo-1549687880-f68be654594c?w=600&h=400&fit=crop',
  },
  {
    id: 'communion',
    name: 'Holy Communion',
    amharic: 'ቅዱስ ቁርባን',
    description:
      'The most sacred mystery in which the faithful receive the true Body and Blood of Christ. It is the source and summit of the Christian life, uniting believers with God and one another.',
    icon: FiBookOpen,
    image: 'https://images.unsplash.com/photo-1560254532-937f0c90838f?w=600&h=400&fit=crop',
  },
  {
    id: 'confession',
    name: 'Confession',
    amharic: 'ንስሐ',
    description:
      'The sacrament of repentance and reconciliation. Through confession before God and the priest, the faithful receive forgiveness of sins and spiritual healing for the soul.',
    icon: FiHeart,
    image: 'https://images.unsplash.com/photo-1552384851-6f681b7ebe7a?w=600&h=400&fit=crop',
  },
  {
    id: 'matrimony',
    name: 'Holy Matrimony',
    amharic: 'ቅዱስ ጋብቻ',
    description:
      'The sacrament uniting a man and woman in a holy bond of love. Through this mystery, God blesses the union and grants the grace to grow together in faith and mutual devotion.',
    icon: FiHome,
    image: 'https://images.unsplash.com/photo-1706725568786-98018a70e331?w=600&h=400&fit=crop',
  },
  {
    id: 'orders',
    name: 'Holy Orders',
    amharic: 'ክህነት',
    description:
      'The sacrament through which men are ordained to serve the Church as deacons, priests, or bishops. It confers the spiritual authority to minister in the name of Christ.',
    icon: FiUser,
    image: 'https://images.unsplash.com/photo-1782283849015-df78517d4765?w=600&h=400&fit=crop',
  },
  {
    id: 'anointing',
    name: 'Anointing of the Sick',
    amharic: 'ቅብዓ',
    description:
      'The sacrament of healing for those who are ill or in danger of death. Through the anointing with holy oil, the faithful receive physical and spiritual restoration.',
    icon: FiSun,
    image: 'https://images.unsplash.com/photo-1768590284133-c72db482f264?w=600&h=400&fit=crop',
  },
  {
    id: 'chrism',
    name: 'Holy Chrism',
    amharic: 'ሜሮን',
    description:
      'The sacrament of confirmation, administered through the anointing with sacred chrism oil. It seals the baptized with the gifts of the Holy Spirit, deepening their union with the Church.',
    icon: FiStar,
    image: 'https://images.unsplash.com/photo-1704408347810-8c7048e445a9?w=600&h=400&fit=crop',
  },
];

export const featuredSacrament = {
  title: 'Holy Communion',
  subtitle: 'The Source & Summit',
  description: [
    'Holy Communion, known as the Eucharist, stands as the most sacred mystery in the Ethiopian Orthodox Tewahedo Church. It is the heart of all worship and the center of the Christian life.',
    'Through the words of institution spoken by the priest during the Divine Liturgy, the bread and wine are transformed into the true Body and Blood of our Lord Jesus Christ. The faithful receive this sacred gift with reverence, fasting, and deep preparation.',
    'The Ethiopian Orthodox tradition emphasizes the importance of worthily receiving Holy Communion. The faithful approach the chalice only after prayerful preparation, confession of sins, and fasting, recognizing the profound sanctity of this divine mystery.',
  ],
  image: 'https://images.unsplash.com/photo-1549687880-f68be654594c?w=900&h=600&fit=crop',
  imageAlt: 'Holy Communion ceremony in an Ethiopian Orthodox Church',
  verse: '"This is my body which is given for you. Do this in remembrance of me."',
  reference: 'Luke 22:19',
};

export const preparationGuidelines = [
  {
    title: 'Prayer',
    description:
      'Approach the sacraments with a heart devoted to prayer. Regular communication with God prepares the soul to receive His grace fully.',
    icon: FiBook,
  },
  {
    title: 'Fasting',
    description:
      'Observe the prescribed fasting periods before receiving the Holy Mysteries. Fasting disciplines the body and sharpens spiritual awareness.',
    icon: FiClock,
  },
  {
    title: 'Confession',
    description:
      'Before receiving Communion, confess all sins to a priest. A clean conscience and a repentant heart are essential for worthy participation.',
    icon: FiHeart,
  },
  {
    title: 'Faith',
    description:
      'Come with sincere faith in the Holy Trinity and the teachings of the Church. Faith opens the heart to receive the fullness of God\'s grace.',
    icon: FiStar,
  },
  {
    title: 'Church Attendance',
    description:
      'Regular participation in the Divine Liturgy and church life strengthens your connection to the body of Christ and the sacramental life.',
    icon: FiHome,
  },
  {
    title: 'Respect',
    description:
      'Maintain reverence and devotion during the celebration of the Holy Mysteries. Dress modestly and observe silence in the sanctuary.',
    icon: FiCheck,
  },
];

export const requestCards = [
  {
    id: 'baptism-request',
    title: 'Baptism',
    description:
      'Request the Sacrament of Baptism for yourself or your child. Our clergy will guide you through the preparation process.',
    icon: FiDroplet,
    link: '/contact',
  },
  {
    id: 'marriage-request',
    title: 'Marriage',
    description:
      'Seek the blessing of Holy Matrimony. We offer pre-marriage counseling and a beautiful traditional ceremony.',
    icon: FiHome,
    link: '/contact',
  },
  {
    id: 'confession-request',
    title: 'Confession',
    description:
      'Schedule a private confession with our priest. Spiritual guidance and reconciliation are available for all the faithful.',
    icon: FiHeart,
    link: '/contact',
  },
  {
    id: 'anointing-request',
    title: 'Anointing of the Sick',
    description:
      'Request the Sacrament of Anointing for a sick or elderly member of your family. Our clergy will visit when needed.',
    icon: FiSun,
    link: '/contact',
  },
];

export const faqData = [
  {
    question: 'Who can receive Holy Communion?',
    answer:
      'Holy Communion is offered to all baptized Orthodox Christians who have prepared themselves through prayer, fasting, and confession. Those who have not yet been baptized or are from other Christian traditions are welcome to attend the liturgy and may receive a blessing from the priest.',
  },
  {
    question: 'How do I schedule a Baptism?',
    answer:
      'To schedule a baptism, please contact our church office or speak with one of our priests after the Divine Liturgy. We will arrange a time for preparation classes and set a date for the baptism ceremony. Godparents are required to be practicing Orthodox Christians.',
  },
  {
    question: 'What preparation is required for the sacraments?',
    answer:
      'Preparation varies by sacrament but typically includes prayer, fasting, confession of sins, and attendance at preparatory sessions. For Baptism and Holy Orders, additional instruction and meetings with the clergy are required. Contact our church office for specific guidance.',
  },
  {
    question: 'Can adults be baptized in the Ethiopian Orthodox Church?',
    answer:
      'Yes, adults are welcome to receive Baptism in the Ethiopian Orthodox Tewahedo Church. Catechetical classes are provided to instruct catechumen in the faith, prayers, and traditions of the Church before the baptism ceremony.',
  },
  {
    question: 'How do I contact a priest for spiritual guidance?',
    answer:
      'You can reach our priests by calling the church office, sending an email, or speaking with them after the Divine Liturgy. Emergency pastoral care is available for those in urgent need of spiritual counsel or the sacraments.',
  },
];

export const scriptureData = {
  verse: 'Unless one is born of water and the Spirit, he cannot enter the kingdom of God.',
  reference: 'John 3:5',
  explanation:
    'These words of our Lord Jesus Christ affirm the essential role of Baptism and the Holy Spirit in the life of every believer. The Holy Mysteries are the means by which God imparts His grace to transform and save the human soul.',
    image:
      'https://images.unsplash.com/photo-1552384851-6f681b7ebe7a?w=1920&h=800&fit=crop',
};
