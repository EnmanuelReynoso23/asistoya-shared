/**
 * Constants
 * Shared constants for the application
 */

// ============================================
// Roles
// ============================================

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student',
  CEO: 'ceo',
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];

// ============================================
// Attendance Status
// ============================================

export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  LATE: 'late',
  ABSENT: 'absent',
  EXCUSED: 'excused',
} as const;

export type AttendanceStatusType = typeof ATTENDANCE_STATUS[keyof typeof ATTENDANCE_STATUS];

// ============================================
// Attendance Methods
// ============================================

export const ATTENDANCE_METHODS = {
  MANUAL: 'manual',
  FACE_RECOGNITION: 'face_recognition',
  QR_CODE: 'qr_code',
  AUTO: 'auto',
} as const;

export type AttendanceMethodType = typeof ATTENDANCE_METHODS[keyof typeof ATTENDANCE_METHODS];

// ============================================
// Student Status
// ============================================

export const STUDENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TRANSFERRED: 'transferred',
  GRADUATED: 'graduated',
  WITHDRAWN: 'withdrawn',
  ON_LEAVE: 'on_leave',
} as const;

export type StudentStatusType = typeof STUDENT_STATUS[keyof typeof STUDENT_STATUS];

// ============================================
// Teacher Status
// ============================================

export const TEACHER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'on_leave',
} as const;

export type TeacherStatusType = typeof TEACHER_STATUS[keyof typeof TEACHER_STATUS];

// ============================================
// Course Status
// ============================================

export const COURSE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;

export type CourseStatusType = typeof COURSE_STATUS[keyof typeof COURSE_STATUS];

// ============================================
// School Status
// ============================================

export const SCHOOL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

export type SchoolStatusType = typeof SCHOOL_STATUS[keyof typeof SCHOOL_STATUS];

// ============================================
// Subscription Plans
// ============================================

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export type SubscriptionPlanType = typeof SUBSCRIPTION_PLANS[keyof typeof SUBSCRIPTION_PLANS];

// ============================================
// Notification Types
// ============================================

export const NOTIFICATION_TYPES = {
  ATTENDANCE: 'attendance',
  ALERT: 'alert',
  ANNOUNCEMENT: 'announcement',
  REMINDER: 'reminder',
  SYSTEM: 'system',
  ARRIVAL: 'arrival',
  DEPARTURE: 'departure',
  ABSENCE: 'absence',
} as const;

export type NotificationTypeConst = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// ============================================
// Notification Priority
// ============================================

export const NOTIFICATION_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export type NotificationPriorityType = typeof NOTIFICATION_PRIORITY[keyof typeof NOTIFICATION_PRIORITY];

// ============================================
// Error Codes
// ============================================

export const ERROR_CODES = {
  // Auth errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  
  // Database errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  QUERY_ERROR: 'QUERY_ERROR',
  
  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Business logic errors
  ATTENDANCE_ALREADY_MARKED: 'ATTENDANCE_ALREADY_MARKED',
  STUDENT_NOT_ENROLLED: 'STUDENT_NOT_ENROLLED',
  COURSE_FULL: 'COURSE_FULL',
  INVALID_DATE_RANGE: 'INVALID_DATE_RANGE',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
} as const;

export type ErrorCodeType = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// ============================================
// Pagination Defaults
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// ============================================
// Date Formats
// ============================================

export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  DISPLAY_DATE: 'DD/MM/YYYY',
  DISPLAY_TIME: 'hh:mm A',
  DISPLAY_DATETIME: 'DD/MM/YYYY hh:mm A',
} as const;

// ============================================
// Time Constants
// ============================================

export const TIME_CONSTANTS = {
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  DAYS_PER_WEEK: 7,
  LATE_THRESHOLD_MINUTES: 15,
  SESSION_DURATION_HOURS: 24,
  TOKEN_EXPIRY_HOURS: 1,
  REFRESH_TOKEN_EXPIRY_DAYS: 7,
} as const;

// ============================================
// File Size Limits
// ============================================

export const FILE_SIZE_LIMITS = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_AVATAR_SIZE: 2 * 1024 * 1024, // 2MB
} as const;

// ============================================
// Supported File Types
// ============================================

export const SUPPORTED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  EXPORTS: ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/json'],
} as const;

// ============================================
// Realtime Channels
// ============================================

export const REALTIME_CHANNELS = {
  ATTENDANCE: 'attendance',
  NOTIFICATIONS: 'notifications',
  SCHOOL_UPDATES: 'school_updates',
  COURSE_UPDATES: 'course_updates',
} as const;

export type RealtimeChannelType = typeof REALTIME_CHANNELS[keyof typeof REALTIME_CHANNELS];

// ============================================
// Days of Week
// ============================================

export const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export type DayOfWeek = typeof DAYS_OF_WEEK[number];
