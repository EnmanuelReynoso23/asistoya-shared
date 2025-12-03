/**
 * Attendance Validators
 * Zod schemas for attendance validation
 */

import { z } from 'zod';

// ============================================
// Attendance Schemas
// ============================================

/**
 * Attendance status schema
 */
export const attendanceStatusSchema = z.enum(['present', 'late', 'absent', 'excused']);

/**
 * Attendance method schema
 */
export const attendanceMethodSchema = z.enum(['manual', 'face_recognition', 'qr_code', 'auto']);

/**
 * Mark attendance schema
 */
export const markAttendanceSchema = z.object({
  studentCode: z.string().min(1, 'Student code is required'),
  studentName: z.string().min(1, 'Student name is required'),
  schoolId: z.string().uuid('Invalid school ID'),
  schoolCode: z.string().min(1, 'School code is required'),
  courseCode: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Invalid time format').optional(),
  status: attendanceStatusSchema,
  method: attendanceMethodSchema.optional().default('manual'),
  teacherCode: z.string().optional(),
  notes: z.string().max(500).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

/**
 * Bulk mark attendance schema
 */
export const bulkMarkAttendanceSchema = z.object({
  records: z.array(markAttendanceSchema).min(1, 'At least one record is required'),
});

/**
 * Update attendance schema
 */
export const updateAttendanceSchema = z.object({
  status: attendanceStatusSchema.optional(),
  notes: z.string().max(500).optional(),
  excuseReason: z.string().max(500).optional(),
});

/**
 * Query attendance schema
 */
export const queryAttendanceSchema = z.object({
  schoolId: z.string().uuid().optional(),
  courseCode: z.string().optional(),
  studentCode: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  status: attendanceStatusSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Type exports (prefixed with Validated to avoid conflicts with types)
export type ValidatedMarkAttendanceInput = z.infer<typeof markAttendanceSchema>;
export type ValidatedBulkMarkAttendanceInput = z.infer<typeof bulkMarkAttendanceSchema>;
export type ValidatedUpdateAttendanceInput = z.infer<typeof updateAttendanceSchema>;
export type ValidatedQueryAttendanceInput = z.infer<typeof queryAttendanceSchema>;
