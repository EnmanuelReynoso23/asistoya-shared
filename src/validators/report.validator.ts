/**
 * Report Validators
 * Zod schemas for report validation
 */

import { z } from 'zod';
import { attendanceStatusSchema } from './attendance.validator';

// ============================================
// Report Schemas
// ============================================

/**
 * Report type schema
 */
export const reportTypeSchema = z.enum(['daily', 'weekly', 'monthly', 'custom']);

/**
 * Report format schema
 */
export const reportFormatSchema = z.enum(['pdf', 'excel', 'csv']);

/**
 * Export type schema
 */
export const exportTypeSchema = z.enum(['students', 'teachers', 'courses', 'attendance']);

/**
 * Export format schema
 */
export const exportFormatSchema = z.enum(['csv', 'excel', 'json']);

/**
 * Generate report schema
 */
export const generateReportSchema = z.object({
  type: reportTypeSchema,
  schoolId: z.string().uuid('Invalid school ID'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  format: reportFormatSchema.optional().default('pdf'),
  filters: z.object({
    courseId: z.string().uuid().optional(),
    studentId: z.string().uuid().optional(),
    status: attendanceStatusSchema.optional(),
  }).optional(),
  includeCharts: z.boolean().optional().default(true),
});

/**
 * Export data schema
 */
export const exportDataSchema = z.object({
  type: exportTypeSchema,
  schoolId: z.string().uuid('Invalid school ID'),
  format: exportFormatSchema,
  filters: z.record(z.unknown()).optional(),
});

/**
 * Report date range schema
 */
export const reportDateRangeSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
}).refine(
  (data) => new Date(data.startDate) <= new Date(data.endDate),
  { message: 'Start date must be before or equal to end date' }
);

// Type exports
export type GenerateReportInput = z.infer<typeof generateReportSchema>;
export type ExportDataInput = z.infer<typeof exportDataSchema>;
export type ReportDateRangeInput = z.infer<typeof reportDateRangeSchema>;
