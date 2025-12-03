/**
 * Response Types
 * Shared response types for API endpoints
 */

import type { Student, StudentStats } from './student';
import type { Teacher } from './teacher';
import type { Course } from './course';
import type { AttendanceRecord, AttendanceStats, DailyAttendanceSummary } from './attendance';
import type { School, SchoolStats } from './school';
import type { User, AuthUser } from './user';
import type { Notification } from './notification';

// ============================================
// Base Response Types
// ============================================

/**
 * Base API response wrapper
 */
export interface ApiResponseWrapper<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiErrorResponse;
  timestamp?: string;
}

/**
 * API success response
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    field?: string;
  };
  timestamp: string;
}

/**
 * Paginated API response
 */
export interface PaginatedApiResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  timestamp: string;
}

// ============================================
// Auth Response Types
// ============================================

/**
 * Auth tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: string;
}

/**
 * Login response
 */
export interface LoginResponse {
  success: true;
  data: {
    user: User;
    tokens: AuthTokens;
  };
  timestamp: string;
}

/**
 * Register response
 */
export interface RegisterResponse {
  success: true;
  data: {
    user: User;
    tokens: AuthTokens;
    emailConfirmationRequired: boolean;
  };
  timestamp: string;
}

/**
 * Current user response
 */
export interface CurrentUserResponse {
  success: true;
  data: {
    user: User;
    school?: School;
    permissions?: string[];
  };
  timestamp: string;
}

// ============================================
// Student Response Types
// ============================================

/**
 * Student response
 */
export interface StudentResponse {
  success: true;
  data: Student;
  timestamp: string;
}

/**
 * Students list response
 */
export interface StudentsListResponse extends PaginatedApiResponse<Student> {}

/**
 * Student stats response
 */
export interface StudentStatsResponse {
  success: true;
  data: StudentStats;
  timestamp: string;
}

// ============================================
// Teacher Response Types
// ============================================

/**
 * Teacher response
 */
export interface TeacherResponse {
  success: true;
  data: Teacher;
  timestamp: string;
}

/**
 * Teachers list response
 */
export interface TeachersListResponse extends PaginatedApiResponse<Teacher> {}

// ============================================
// Course Response Types
// ============================================

/**
 * Course response
 */
export interface CourseResponse {
  success: true;
  data: Course;
  timestamp: string;
}

/**
 * Courses list response
 */
export interface CoursesListResponse extends PaginatedApiResponse<Course> {}

/**
 * Course students response
 */
export interface CourseStudentsResponse {
  success: true;
  data: {
    course: Course;
    students: Student[];
  };
  timestamp: string;
}

// ============================================
// Attendance Response Types
// ============================================

/**
 * Attendance record response
 */
export interface AttendanceResponse {
  success: true;
  data: AttendanceRecord;
  timestamp: string;
}

/**
 * Attendance list response
 */
export interface AttendanceListResponse extends PaginatedApiResponse<AttendanceRecord> {}

/**
 * Attendance stats response
 */
export interface AttendanceStatsResponse {
  success: true;
  data: AttendanceStats;
  timestamp: string;
}

/**
 * Daily summary response
 */
export interface DailySummaryResponse {
  success: true;
  data: DailyAttendanceSummary[];
  timestamp: string;
}

/**
 * Bulk attendance response
 */
export interface BulkAttendanceResponse {
  success: true;
  data: {
    processed: number;
    successful: number;
    failed: number;
    errors?: Array<{
      studentCode: string;
      error: string;
    }>;
  };
  timestamp: string;
}

// ============================================
// School Response Types
// ============================================

/**
 * School response
 */
export interface SchoolResponse {
  success: true;
  data: School;
  timestamp: string;
}

/**
 * Schools list response
 */
export interface SchoolsListResponse extends PaginatedApiResponse<School> {}

/**
 * School stats response
 */
export interface SchoolStatsResponse {
  success: true;
  data: SchoolStats;
  timestamp: string;
}

// ============================================
// Notification Response Types
// ============================================

/**
 * Notification response
 */
export interface NotificationResponse {
  success: true;
  data: Notification;
  timestamp: string;
}

/**
 * Notifications list response
 */
export interface NotificationsListResponse extends PaginatedApiResponse<Notification> {}

/**
 * Unread count response
 */
export interface UnreadCountResponse {
  success: true;
  data: {
    count: number;
  };
  timestamp: string;
}

// ============================================
// Report Response Types
// ============================================

/**
 * Report generation response
 */
export interface ReportResponse {
  success: true;
  data: {
    reportId: string;
    url?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    expiresAt?: string;
  };
  timestamp: string;
}

/**
 * Export response
 */
export interface ExportResponse {
  success: true;
  data: {
    exportId: string;
    url: string;
    filename: string;
    format: string;
    size: number;
    expiresAt: string;
  };
  timestamp: string;
}

// ============================================
// Health Check Response
// ============================================

/**
 * Health check response
 */
export interface HealthCheckResponse {
  success: true;
  data: {
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    timestamp: string;
    services: {
      database: 'up' | 'down';
      cache?: 'up' | 'down';
      storage?: 'up' | 'down';
    };
  };
  timestamp: string;
}
