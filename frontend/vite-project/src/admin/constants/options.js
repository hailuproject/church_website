export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  PRIEST: 'Priest',
  SECRETARY: 'Secretary',
  DEACON: 'Deacon',
};

export const ROLE_VALUES = Object.values(ROLES);

export const ANNOUNCEMENT_PRIORITIES = ['Low', 'Normal', 'High', 'Critical'];
export const EVENT_CATEGORIES = ['Liturgy', 'Fasting', 'Feast', 'Wedding', 'Baptism', 'Seminar', 'Conference', 'Youth', 'Charity', 'Other'];
export const EVENT_STATUSES = ['upcoming', 'ongoing', 'completed', 'cancelled'];
export const SERMON_CATEGORIES = ['Sunday Sermon', 'Bible Study', 'Homily', 'Lent', 'Feast', 'Teaching', 'Other'];
export const SERMON_LANGUAGES = ['English', 'Amharic', 'Both', 'Other'];
export const RESOURCE_CATEGORIES = ['Books', 'Prayers', 'Hymns', 'Scriptures', 'Liturgy', 'Music', 'Other'];
export const RESOURCE_LANGUAGES = SERMON_LANGUAGES;
export const GALLERY_CATEGORIES = ['Liturgy', 'Festival', 'Ordination', 'Baptism', 'Community', 'Conference', 'Other'];
export const MEMBERSHIP_STATUSES = ['pending', 'approved', 'rejected', 'inactive'];
export const SACRAMENT_TYPES = ['Baptism', 'Holy Communion', 'Confession', 'Matrimony', 'Anointing of the Sick', 'Ordination', 'House Blessing', 'Other'];
export const SACRAMENT_STATUSES = ['pending', 'scheduled', 'confirmed', 'completed', 'cancelled', 'rejected'];
export const DONATION_STATUSES = ['pending', 'completed', 'failed', 'refunded'];
export const DONATION_PAYMENT_METHODS = ['stripe', 'telebirr', 'cbe-birr', 'cash', 'bank-transfer', 'other'];
export const CONTACT_CATEGORIES = ['General', 'Prayer Request', 'Membership', 'Donation', 'Event', 'Bible Question', 'Support', 'Other'];
export const CONTACT_STATUSES = ['new', 'read', 'replied', 'archived'];
export const PRAYER_STATUSES = ['new', 'prayed', 'answered', 'closed'];
export const RSVP_STATUSES = ['confirmed', 'pending', 'cancelled'];
export const AUDIT_ACTIONS = ['create', 'update', 'delete', 'login', 'logout', 'register', 'approve', 'reject', 'status-change', 'upload', 'download', 'send', 'reset-password', 'verify-email'];

export const LEADERSHIP_ROLES = ['Priest', 'Head Priest', 'Deacon', 'Evangelist', 'Teacher', 'Elder', 'Secretary', 'Committee'];

export const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'amharic', label: 'አማርኛ' },
];

export const STATUS_STYLES = {
  new: 'info',
  read: 'neutral',
  replied: 'success',
  archived: 'neutral',
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  inactive: 'neutral',
  scheduled: 'info',
  confirmed: 'success',
  completed: 'success',
  cancelled: 'danger',
  failed: 'danger',
  refunded: 'neutral',
  upcoming: 'info',
  ongoing: 'warning',
  prayed: 'success',
  answered: 'success',
  closed: 'neutral',
  published: 'success',
  active: 'success',
  deactivated: 'danger',
};
