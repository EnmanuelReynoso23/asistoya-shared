/**
 * Course Types
 * Shared types for the course management system
 */

import type { Database } from './supabase';

// Base Supabase types
export type CourseRow = Database['public']['Tables']['courses']['Row'];
export type CourseInsert = Database['public']['Tables']['courses']['Insert'];
export type CourseUpdate = Database['public']['Tables']['courses']['Update'];

/**
 * Teacher information in a course
 */
export interface CourseTeacher {
  id: string;
  name: string;
  code: string;
  email?: string;
}

/**
 * Class schedule
 */
export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room?: string;
}

/**
 * Course configuration
 */
export interface CourseSettings {
  autoCloseTime?: string;
  notifyParents?: boolean;
  allowLateEntry?: boolean;
  notifyTeachers?: boolean;
  autoCloseAttendance?: boolean;
  lateThresholdMinutes?: number;
  requiresFaceRecognition?: boolean;
}

/**
 * Course status
 */
export type CourseStatus = 'active' | 'inactive' | 'archived';

/**
 * Unified Course interface
 */
export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  grade: string;
  section?: string;
  schoolId: string;
  schoolCode: string;
  teacherId?: string;
  teacherCode?: string;
  teacherName?: string;
  teacherIds?: string[];
  teachers?: CourseTeacher[];
  schedule?: ClassSchedule[];
  room?: string;
  maxStudents?: number;
  totalStudents?: number;
  startDate?: string;
  endDate?: string;
  status: CourseStatus;
  settings?: CourseSettings;
  createdAt: string;
  updatedAt: string;
}


