export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  PRIEST: 'Priest',
  SECRETARY: 'Secretary',
  DEACON: 'Deacon',
};

export const ROLE_VALUES = Object.values(ROLES);

export const PERMISSIONS = {
  MANAGE_CONTENT: 'manage:content',
  MANAGE_SERMONS: 'manage:sermons',
  MANAGE_EVENTS: 'manage:events',
  MANAGE_GALLERY: 'manage:gallery',
  MANAGE_RESOURCES: 'manage:resources',
  MANAGE_DONATIONS: 'manage:donations',
  MANAGE_CONTACT: 'manage:contact',
  MANAGE_SETTINGS: 'manage:settings',
  MANAGE_USERS: 'manage:users',
  VIEW_AUDIT_LOGS: 'view:audit-logs',
  MANAGE_ROLES: 'manage:roles',
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: Object.values(PERMISSIONS),
  [ROLES.PRIEST]: [
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.MANAGE_SERMONS,
    PERMISSIONS.MANAGE_EVENTS,
  ],
  [ROLES.SECRETARY]: [
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.MANAGE_DONATIONS,
    PERMISSIONS.MANAGE_CONTACT,
  ],
  [ROLES.DEACON]: [
    PERMISSIONS.MANAGE_CONTENT,
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
  DONATION_RECEIPTS: 'church/donations/receipts',
  CONTENT: 'church/content',
  MISC: 'church/misc',
};

export const CONTENT_KEYS = ['home', 'about', 'contact', 'donate', 'footer'];

export const EVENT_CATEGORIES = ['Liturgy', 'Fasting', 'Feast', 'Wedding', 'Baptism', 'Seminar', 'Conference', 'Youth', 'Charity', 'Other'];
export const EVENT_STATUSES = ['upcoming', 'ongoing', 'completed', 'cancelled'];
export const SERMON_CATEGORIES = ['Sunday Sermon', 'Bible Study', 'Homily', 'Lent', 'Feast', 'Teaching', 'Other'];
export const SERMON_LANGUAGES = ['English', 'Amharic', 'Both', 'Other'];
export const RESOURCE_CATEGORIES = ['Books', 'Prayers', 'Hymns', 'Scriptures', 'Liturgy', 'Music', 'Other'];
export const RESOURCE_LANGUAGES = SERMON_LANGUAGES;
export const GALLERY_CATEGORIES = ['Liturgy', 'Festival', 'Ordination', 'Baptism', 'Community', 'Conference', 'Other'];
export const DONATION_STATUSES = ['pending', 'completed', 'failed', 'refunded'];
export const DONATION_PAYMENT_METHODS = ['cash', 'bank-transfer', 'telebirr', 'cbe-birr', 'other'];
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
  CONTENT_KEYS,
  EVENT_CATEGORIES,
  EVENT_STATUSES,
  SERMON_CATEGORIES,
  SERMON_LANGUAGES,
  RESOURCE_CATEGORIES,
  RESOURCE_LANGUAGES,
  GALLERY_CATEGORIES,
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
