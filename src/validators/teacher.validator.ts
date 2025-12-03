/**
 * Teacher Validators
 * Zod schemas for teacher validation
 */

import { z } from 'zod';

// ============================================
// Teacher Schemas
// ============================================

/**
 * Teacher status schema
 */
export const teacherStatusSchema = z.enum(['active', 'inactive', 'on_leave']);

/**
 * Create teacher schema
 */
export const createTeacherSchema = z.object({
  code: z.string().min(1, 'Teacher code is required'),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  schoolId: z.string().uuid('Invalid school ID'),
  schoolCode: z.string().min(1, 'School code is required'),
  address: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  hireDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  specialization: z.array(z.string()).optional(),
  status: teacherStatusSchema.optional().default('active'),
});

/**
 * Update teacher schema
 */
export const updateTeacherSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  specialization: z.array(z.string()).optional(),
  status: teacherStatusSchema.optional(),
});

/**
 * Query teachers schema
 */
export const queryTeachersSchema = z.object({
  schoolId: z.string().uuid().optional(),
  status: teacherStatusSchema.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// Type exports
export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
export type QueryTeachersInput = z.infer<typeof queryTeachersSchema>;
