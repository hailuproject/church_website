export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  PRIEST: 'Priest',
  SECRETARY: 'Secretary',
  DEACON: 'Deacon',
};

export const ROLE_VALUES = Object.values(ROLES);

export const PERMISSIONS = {
  // Content
  MANAGE_ANNOUNCEMENTS: 'manage:announcements',
  MANAGE_SERMONS: 'manage:sermons',
  MANAGE_EVENTS: 'manage:events',
  MANAGE_SACRAMENTS: 'manage:sacraments',
  MANAGE_GALLERY: 'manage:gallery',
  MANAGE_RESOURCES: 'manage:resources',
  MANAGE_MEMBERSHIP: 'manage:membership',
  MANAGE_DONATIONS: 'manage:donations',
  MANAGE_CONTACT: 'manage:contact',
  MANAGE_HOME: 'manage:home',
  MANAGE_ABOUT: 'manage:about',
  MANAGE_LEADERSHIP: 'manage:leadership',
  MANAGE_SETTINGS: 'manage:settings',
  MANAGE_LANGUAGES: 'manage:languages',
  // System
  MANAGE_USERS: 'manage:users',
  MANAGE_MEDIA: 'manage:media',
  VIEW_ANALYTICS: 'view:analytics',
  VIEW_AUDIT_LOGS: 'view:audit-logs',
  MANAGE_ROLES: 'manage:roles',
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.PRIEST]: [
    PERMISSIONS.MANAGE_SERMONS,
    PERMISSIONS.MANAGE_SACRAMENTS,
    PERMISSIONS.MANAGE_EVENTS,
    PERMISSIONS.MANAGE_ANNOUNCEMENTS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.SECRETARY]: [
    PERMISSIONS.MANAGE_MEMBERSHIP,
    PERMISSIONS.MANAGE_DONATIONS,
    PERMISSIONS.MANAGE_CONTACT,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.DEACON]: [
    PERMISSIONS.MANAGE_GALLERY,
    PERMISSIONS.MANAGE_RESOURCES,
    PERMISSIONS.MANAGE_EVENTS,
  ],
};

export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  PDF: 'pdf',
  OTHER: 'other',
};

export const FILE_MIME_TYPES = {
  [MEDIA_TYPES.IMAGE]: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/bmp'],
  [MEDIA_TYPES.VIDEO]: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
  [MEDIA_TYPES.AUDIO]: ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/ogg', 'audio/webm'],
  [MEDIA_TYPES.PDF]: ['application/pdf'],
};

export const CLOUDINARY_FOLDERS = {
  AVATARS: 'church/avatars',
  HEROES: 'church/heroes',
  LOGOS: 'church/logos',
  SERMON_THUMBNAILS: 'church/sermons/thumbnails',
  SERMON_AUDIO: 'church/sermons/audio',
  SERMON_VIDEO: 'church/sermons/videos',
  EVENT_COVERS: 'church/events',
  GALLERY_IMAGES: 'church/gallery/images',
  GALLERY_VIDEOS: 'church/gallery/videos',
  RESOURCE_THUMBNAILS: 'church/resources/thumbnails',
  RESOURCE_FILES: 'church/resources/files',
  MEMBERSHIP_DOCUMENTS: 'church/membership/documents',
  DONATION_RECEIPTS: 'church/donations/receipts',
  HOME: 'church/home',
  ABOUT: 'church/about',
  MISC: 'church/misc',
};

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
export const AUDIT_ACTIONS = ['create', 'update', 'delete', 'login', 'logout', 'register', 'approve', 'reject', 'status-change', 'upload', 'download', 'send', 'reset-password', 'verify-email'];

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
};

export const DEFAULT_LIMITS = {
  page: 1,
  limit: 20,
  maxLimit: 100,
};

export const PUBLIC_KEYS = [
  'password',
  'refreshToken',
  '__v',
  'verificationToken',
  'verificationTokenExpires',
  'resetPasswordToken',
  'resetPasswordExpires',
];

export const CONSTANTS = {
  ROLES,
  ROLE_VALUES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  MEDIA_TYPES,
  FILE_MIME_TYPES,
  CLOUDINARY_FOLDERS,
  ANNOUNCEMENT_PRIORITIES,
  EVENT_CATEGORIES,
  EVENT_STATUSES,
  SERMON_CATEGORIES,
  SERMON_LANGUAGES,
  RESOURCE_CATEGORIES,
  RESOURCE_LANGUAGES,
  GALLERY_CATEGORIES,
  MEMBERSHIP_STATUSES,
  SACRAMENT_TYPES,
  SACRAMENT_STATUSES,
  DONATION_STATUSES,
  DONATION_PAYMENT_METHODS,
  CONTACT_CATEGORIES,
  CONTACT_STATUSES,
  AUDIT_ACTIONS,
  COOKIE_OPTIONS,
  DEFAULT_LIMITS,
  PUBLIC_KEYS,
};

export default CONSTANTS;
