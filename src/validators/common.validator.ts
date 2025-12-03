/**
 * Common Validators
 * Shared Zod schemas used across the application
 */

import { z } from 'zod';

// ============================================
// Common Schemas
// ============================================

/**
 * UUID schema
 */
export const uuidSchema = z.string().uuid('Invalid UUID format');

/**
 * Date string schema (YYYY-MM-DD)
 */
export const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)');

/**
 * Time string schema (HH:mm)
 */
export const timeStringSchema = z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)');

/**
 * Datetime string schema (ISO 8601)
 */
export const datetimeStringSchema = z.string().datetime('Invalid datetime format');

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

/**
 * ID params schema
 */
export const idParamsSchema = z.object({
  id: uuidSchema,
});

/**
 * Code params schema
 */
export const codeParamsSchema = z.object({
  code: z.string().min(1, 'Code is required'),
});

/**
 * Search schema
 */
export const searchSchema = z.object({
  q: z.string().optional(),
  search: z.string().optional(),
});

/**
 * Date range schema
 */
export const dateRangeSchema = z.object({
  startDate: dateStringSchema,
  endDate: dateStringSchema,
}).refine(
  (data) => new Date(data.startDate) <= new Date(data.endDate),
  { message: 'Start date must be before or equal to end date' }
);

/**
 * Coordinates schema
 */
export const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

/**
 * Phone number schema (basic validation)
 */
export const phoneSchema = z.string().regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/, 'Invalid phone number');

/**
 * URL schema
 */
export const urlSchema = z.string().url('Invalid URL');

/**
 * Non-empty string schema
 */
export const nonEmptyStringSchema = z.string().min(1, 'This field cannot be empty');

// Type exports
export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdParamsInput = z.infer<typeof idParamsSchema>;
export type CodeParamsInput = z.infer<typeof codeParamsSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
export type CoordinatesInput = z.infer<typeof coordinatesSchema>;
