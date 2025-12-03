/**
 * Student Validators
 * Zod schemas for student validation
 */

import { z } from 'zod';

// ============================================
// Student Schemas
// ============================================

/**
 * Student status schema
 */
export const studentStatusSchema = z.enum([
  'active',
  'inactive',
  'transferred',
  'graduated',
  'withdrawn',
  'on_leave',
]);

/**
 * Create student schema
 */
export const createStudentSchema = z.object({
  code: z.string().min(1, 'Student code is required'),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email').optional(),
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().optional(),
  schoolId: z.string().uuid('Invalid school ID'),
  schoolCode: z.string().min(1, 'School code is required'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  enrollmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  parentIds: z.array(z.string().uuid()).optional(),
  photo: z.string().url('Invalid photo URL').optional(),
  status: studentStatusSchema.optional().default('active'),
});

/**
 * Update student schema
 */
export const updateStudentSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email('Invalid email').optional(),
  grade: z.string().optional(),
  section: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  photo: z.string().url('Invalid photo URL').optional(),
  status: studentStatusSchema.optional(),
  parentIds: z.array(z.string().uuid()).optional(),
});

/**
 * Query students schema
 */
export const queryStudentsSchema = z.object({
  schoolId: z.string().uuid().optional(),
  courseCode: z.string().optional(),
  grade: z.string().optional(),
  section: z.string().optional(),
  status: studentStatusSchema.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Type exports
export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type QueryStudentsInput = z.infer<typeof queryStudentsSchema>;
