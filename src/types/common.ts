/**
 * Common Types
 * Shared utility types used across the application
 */

/**
 * Database document base interface
 */
export interface DatabaseDocument {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Generic form data
 */
export interface FormData {
  [key: string]: string | number | boolean | Date | null | undefined;
}

/**
 * Select option
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Report configuration
 */
export interface ReportConfig {
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  startDate?: Date;
  endDate?: Date;
  format: 'pdf' | 'excel' | 'csv';
  includeCharts?: boolean;
  filters?: ReportFilters;
}

/**
 * Report filters
 */
export interface ReportFilters {
  courseId?: string;
  studentId?: string;
  status?: 'present' | 'late' | 'absent';
  [key: string]: string | undefined;
}

/**
 * Calendar event
 */
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  type: 'academic' | 'sports' | 'cultural' | 'meeting' | 'holiday' | 'other';
  location?: string;
  createdBy: string;
  schoolId: string;
  participants?: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Generic API response
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}


