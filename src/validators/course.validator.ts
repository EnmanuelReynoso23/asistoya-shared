/**
 * Course Validators
 * Zod schemas for course validation
 */

import { z } from 'zod';

// ============================================
// Course Schemas
// ============================================

/**
 * Course status schema
 */
export const courseStatusSchema = z.enum(['active', 'inactive', 'archived']);

/**
 * Schedule item schema
 */
export const scheduleItemSchema = z.object({
  day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
  room: z.string().optional(),
});

/**
 * Create course schema
 */
export const createCourseSchema = z.object({
  code: z.string().min(1, 'Course code is required'),
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().optional(),
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().optional(),
  schoolId: z.string().uuid('Invalid school ID'),
  schoolCode: z.string().min(1, 'School code is required'),
  teacherId: z.string().uuid('Invalid teacher ID').optional(),
  teacherCode: z.string().optional(),
  teacherName: z.string().optional(),
  room: z.string().optional(),
  maxStudents: z.number().int().positive().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  schedule: z.array(scheduleItemSchema).optional(),
  status: courseStatusSchema.optional().default('active'),
});

/**
 * Update course schema
 */
export const updateCourseSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  grade: z.string().optional(),
  section: z.string().optional(),
  teacherId: z.string().uuid('Invalid teacher ID').optional(),
  teacherCode: z.string().optional(),
  teacherName: z.string().optional(),
  room: z.string().optional(),
  maxStudents: z.number().int().positive().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  schedule: z.array(scheduleItemSchema).optional(),
  status: courseStatusSchema.optional(),
});

/**
 * Query courses schema
 */
export const queryCoursesSchema = z.object({
  schoolId: z.string().uuid().optional(),
  teacherId: z.string().uuid().optional(),
  grade: z.string().optional(),
  section: z.string().optional(),
  status: courseStatusSchema.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/**
 * Add students to course schema
 */
export const addStudentsToCourseSchema = z.object({
  studentIds: z.array(z.string().uuid()).min(1, 'At least one student ID is required'),
});

/**
 * Add teachers to course schema
 */
export const addTeachersToCourseSchema = z.object({
  teacherIds: z.array(z.string().uuid()).min(1, 'At least one teacher ID is required'),
});

// Type exports
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type QueryCoursesInput = z.infer<typeof queryCoursesSchema>;
export type AddStudentsToCourseInput = z.infer<typeof addStudentsToCourseSchema>;
export type AddTeachersToCourseInput = z.infer<typeof addTeachersToCourseSchema>;
