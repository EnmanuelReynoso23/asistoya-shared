/**
 * Auth Validators
 * Zod schemas for authentication validation
 */

import { z } from 'zod';

// ============================================
// Auth Schemas
// ============================================

/**
 * User role schema
 */
export const userRoleSchema = z.enum(['admin', 'teacher', 'parent', 'student', 'ceo']);

/**
 * Email schema
 */
export const emailSchema = z.string().email('Invalid email address');

/**
 * Password schema
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

/**
 * Register schema
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, 'Name is required').max(100),
  role: userRoleSchema.optional().default('parent'),
  schoolId: z.string().uuid('Invalid school ID').optional(),
});

/**
 * Reset password schema
 */
export const resetPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * Change password schema
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
});

/**
 * Confirm password reset schema
 */
export const confirmPasswordResetSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: passwordSchema,
});

/**
 * Refresh token schema
 */
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

/**
 * Switch role schema
 */
export const switchRoleSchema = z.object({
  role: userRoleSchema,
});

/**
 * Update profile schema
 */
export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().optional(),
  photoUrl: z.string().url('Invalid photo URL').optional(),
  metadata: z.object({
    theme: z.enum(['light', 'dark', 'system']).optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
    notifications: z.object({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean(),
    }).optional(),
  }).optional(),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ConfirmPasswordResetInput = z.infer<typeof confirmPasswordResetSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type SwitchRoleInput = z.infer<typeof switchRoleSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
