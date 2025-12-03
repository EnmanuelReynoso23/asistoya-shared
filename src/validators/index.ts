/**
 * Validators Index
 * Export all validators from a single entry point
 */

// Common validators
export * from './common.validator';

// Domain validators
export * from './student.validator';
export * from './teacher.validator';
export * from './course.validator';
export * from './attendance.validator';
export * from './school.validator';
export * from './auth.validator';
export * from './notification.validator';
export * from './report.validator';

// Re-export zod for convenience
export { z } from 'zod';
