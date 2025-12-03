/**
 * Request DTOs
 * Shared request types for API endpoints
 */

import type { AttendanceStatus, AttendanceMethod } from './attendance';
import type { StudentStatus } from './student';
import type { TeacherStatus } from './teacher';
import type { CourseStatus } from './course';
import type { UserRole } from './user';

// ============================================
// Student Request Types
// ============================================

/**
 * Create student request
 */
export interface CreateStudentRequest {
  code: string;
  name: string;
  email?: string;
  grade: string;
  section?: string;
  schoolId: string;
  schoolCode: string;
  dateOfBirth?: string;
  enrollmentDate?: string;
  parentIds?: string[];
  photo?: string;
  status?: StudentStatus;
}

/**
 * Update student request
 */
export interface UpdateStudentRequest {
  name?: string;
  email?: string;
  grade?: string;
  section?: string;
  dateOfBirth?: string;
  photo?: string;
  status?: StudentStatus;
  parentIds?: string[];
}

/**
 * Query students request
 */
export interface QueryStudentsRequest {
  schoolId?: string;
  courseCode?: string;
  grade?: string;
  section?: string;
  status?: StudentStatus;
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================
// Teacher Request Types
// ============================================

/**
 * Create teacher request
 */
export interface CreateTeacherRequest {
  code: string;
  name: string;
  email: string;
  phone?: string;
  schoolId: string;
  schoolCode: string;
  address?: string;
  dateOfBirth?: string;
  hireDate?: string;
  specialization?: string[];
  status?: TeacherStatus;
}

/**
 * Update teacher request
 */
export interface UpdateTeacherRequest {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  specialization?: string[];
  status?: TeacherStatus;
}

/**
 * Query teachers request
 */
export interface QueryTeachersRequest {
  schoolId?: string;
  status?: TeacherStatus;
  search?: string;
  page?: number;
  limit?: number;
}

// ============================================
// Course Request Types
// ============================================

/**
 * Create course request
 */
export interface CreateCourseRequest {
  code: string;
  name: string;
  description?: string;
  grade: string;
  section?: string;
  schoolId: string;
  schoolCode: string;
  teacherId?: string;
  teacherCode?: string;
  teacherName?: string;
  room?: string;
  maxStudents?: number;
  startDate?: string;
  endDate?: string;
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
    room?: string;
  }>;
  status?: CourseStatus;
}

/**
 * Update course request
 */
export interface UpdateCourseRequest {
  name?: string;
  description?: string;
  grade?: string;
  section?: string;
  teacherId?: string;
  teacherCode?: string;
  teacherName?: string;
  room?: string;
  maxStudents?: number;
  startDate?: string;
  endDate?: string;
  schedule?: Array<{
    day: string;
    startTime: string;
    endTime: string;
    room?: string;
  }>;
  status?: CourseStatus;
}

/**
 * Query courses request
 */
export interface QueryCoursesRequest {
  schoolId?: string;
  teacherId?: string;
  grade?: string;
  section?: string;
  status?: CourseStatus;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Add students to course request
 */
export interface AddStudentsToCourseRequest {
  studentIds: string[];
}

/**
 * Add teachers to course request
 */
export interface AddTeachersToCourseRequest {
  teacherIds: string[];
}

// ============================================
// Attendance Request Types
// ============================================

/**
 * Mark attendance request
 */
export interface MarkAttendanceRequest {
  studentCode: string;
  studentName: string;
  schoolId: string;
  schoolCode: string;
  courseCode?: string;
  date: string;
  time?: string;
  status: AttendanceStatus;
  method?: AttendanceMethod;
  teacherCode?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Bulk mark attendance request
 */
export interface BulkMarkAttendanceRequest {
  records: MarkAttendanceRequest[];
}

/**
 * Update attendance request
 */
export interface UpdateAttendanceRequest {
  status?: AttendanceStatus;
  notes?: string;
  excuseReason?: string;
}

/**
 * Query attendance request
 */
export interface QueryAttendanceRequest {
  schoolId?: string;
  courseCode?: string;
  studentCode?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: AttendanceStatus;
  page?: number;
  limit?: number;
}

// ============================================
// School Request Types
// ============================================

/**
 * Create school request
 */
export interface CreateSchoolRequest {
  name: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  zipCode?: string;
  phone: string;
  email: string;
  principal: string;
  logo?: string;
}

/**
 * Update school request
 */
export interface UpdateSchoolRequest {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  principal?: string;
  logo?: string;
}

/**
 * School settings update request
 */
export interface UpdateSchoolSettingsRequest {
  timezone?: string;
  language?: string;
  dateFormat?: string;
  timeFormat?: '12h' | '24h';
  academicYearStart?: string;
  academicYearEnd?: string;
  classStartTime?: string;
  classEndTime?: string;
  lateThresholdMinutes?: number;
  autoMarkAbsent?: boolean;
  autoMarkAbsentTime?: string;
  requireFaceRecognition?: boolean;
  allowManualCorrection?: boolean;
  notifyParentsOnAbsence?: boolean;
  notifyParentsOnLate?: boolean;
}

// ============================================
// Auth Request Types
// ============================================

/**
 * Login request
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register request
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  schoolId?: string;
}

/**
 * Reset password request
 */
export interface ResetPasswordRequest {
  email: string;
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Switch role request
 */
export interface SwitchRoleRequest {
  role: UserRole;
}

// ============================================
// Notification Request Types
// ============================================

/**
 * Create notification request
 */
export interface CreateNotificationRequest {
  userId: string;
  title: string;
  message: string;
  type?: 'attendance' | 'alert' | 'announcement' | 'reminder' | 'system';
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  actionUrl?: string;
  data?: Record<string, unknown>;
}

/**
 * Send push notification request
 */
export interface SendPushNotificationRequest {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  badge?: number;
}

/**
 * Register device token request
 */
export interface RegisterDeviceTokenRequest {
  token: string;
  platform: 'ios' | 'android' | 'web';
  deviceId?: string;
  deviceName?: string;
}

// ============================================
// Report Request Types
// ============================================

/**
 * Generate report request
 */
export interface GenerateReportRequest {
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  schoolId: string;
  startDate: string;
  endDate: string;
  format?: 'pdf' | 'excel' | 'csv';
  filters?: {
    courseId?: string;
    studentId?: string;
    status?: AttendanceStatus;
  };
  includeCharts?: boolean;
}

/**
 * Export data request
 */
export interface ExportDataRequest {
  type: 'students' | 'teachers' | 'courses' | 'attendance';
  schoolId: string;
  format: 'csv' | 'excel' | 'json';
  filters?: Record<string, unknown>;
}
