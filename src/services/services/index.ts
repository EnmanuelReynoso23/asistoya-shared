/**
 * Services Index
 * Export all shared services
 */

export { authService, default as AuthService } from './authService';
export type { SupabaseUser } from './authService';

export { studentService, default as StudentService } from './studentService';

export { attendanceService, default as AttendanceService } from './attendanceService';

export { courseService, default as CourseService } from './courseService';

export { notificationService, default as NotificationService } from './notificationService';


