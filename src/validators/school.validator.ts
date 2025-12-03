/**
 * School Validators
 * Zod schemas for school validation
 */

import { z } from 'zod';

// ============================================
// School Schemas
// ============================================

/**
 * School status schema
 */
export const schoolStatusSchema = z.enum(['active', 'inactive', 'suspended']);

/**
 * Subscription plan schema
 */
export const subscriptionPlanSchema = z.enum(['free', 'basic', 'premium', 'enterprise']);

/**
 * Create school schema
 */
export const createSchoolSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Invalid email'),
  principal: z.string().min(1, 'Principal name is required'),
  logo: z.string().url('Invalid logo URL').optional(),
});

/**
 * Update school schema
 */
export const updateSchoolSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  principal: z.string().optional(),
  logo: z.string().url('Invalid logo URL').optional(),
});

/**
 * School settings schema
 */
export const schoolSettingsSchema = z.object({
  timezone: z.string().optional(),
  language: z.string().optional(),
  dateFormat: z.string().optional(),
  timeFormat: z.enum(['12h', '24h']).optional(),
  academicYearStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  academicYearEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional(),
  classStartTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format').optional(),
  classEndTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format').optional(),
  lateThresholdMinutes: z.number().int().min(1).max(60).optional(),
  autoMarkAbsent: z.boolean().optional(),
  autoMarkAbsentTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format').optional(),
  requireFaceRecognition: z.boolean().optional(),
  allowManualCorrection: z.boolean().optional(),
  notifyParentsOnAbsence: z.boolean().optional(),
  notifyParentsOnLate: z.boolean().optional(),
});

/**
 * School invitation schema
 */
export const schoolInvitationSchema = z.object({
  email: z.string().email('Invalid email'),
  role: z.enum(['teacher', 'admin']),
});

// Type exports
export type CreateSchoolInput = z.infer<typeof createSchoolSchema>;
export type UpdateSchoolInput = z.infer<typeof updateSchoolSchema>;
export type SchoolSettingsInput = z.infer<typeof schoolSettingsSchema>;
export type SchoolInvitationInput = z.infer<typeof schoolInvitationSchema>;
