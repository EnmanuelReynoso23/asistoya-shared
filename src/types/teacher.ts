/**
 * Teacher Types
 * Shared types for the teacher management system
 */

import type { Database } from './supabase';

// Base Supabase types
export type TeacherRow = Database['public']['Tables']['teachers']['Row'];
export type TeacherInsert = Database['public']['Tables']['teachers']['Insert'];
export type TeacherUpdate = Database['public']['Tables']['teachers']['Update'];

/**
 * Teacher statistics
 */
export interface TeacherStats {
  totalCourses: number;
  avgAttendance: number;
  totalStudents: number;
  punctualityScore: number;
}

/**
 * Teacher permissions
 */
export interface TeacherPermissions {
  canManageGrades: boolean;
  canExportReports: boolean;
  canEditAttendance: boolean;
  canMarkAttendance: boolean;
  canViewAllStudents: boolean;
  canSendNotifications: boolean;
}

/**
 * Teacher status
 */
export type TeacherStatus = 'active' | 'inactive' | 'on_leave';

/**
 * Unified Teacher interface
 */
export interface Teacher {
  id: string;
  code: string;
  uid?: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  dateOfBirth?: string;
  hireDate?: string;
  schoolId: string;
  schoolCode: string;
  courses?: string[];
  specialization?: string[];
  status: TeacherStatus;
  stats?: TeacherStats;
  permissions?: TeacherPermissions;
  createdAt: string;
  updatedAt: string;
}


