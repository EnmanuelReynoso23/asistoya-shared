/**
 * Attendance Types
 * Shared types for the attendance system
 */

import type { Database } from './supabase';

// Base Supabase types
export type AttendanceRow = Database['public']['Tables']['attendance']['Row'];
export type AttendanceInsert = Database['public']['Tables']['attendance']['Insert'];
export type AttendanceUpdate = Database['public']['Tables']['attendance']['Update'];

/**
 * Attendance status
 */
export type AttendanceStatus = 'present' | 'late' | 'absent' | 'excused';

/**
 * Attendance method
 */
export type AttendanceMethod = 'manual' | 'face_recognition' | 'qr_code' | 'auto';

/**
 * Attendance record
 */
export interface AttendanceRecord {
  id: string;
  studentCode: string;
  studentName: string;
  courseCode?: string;
  schoolCode: string;
  schoolId: string;
  date: string;
  time?: string;
  status: AttendanceStatus;
  method?: AttendanceMethod;
  markedAt?: string;
  markedBy?: string;
  teacherCode?: string;
  notes?: string;
  excuseReason?: string;
  latitude?: number;
  longitude?: number;
  modifiedAt?: string;
  modifiedBy?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Attendance statistics
 */
export interface AttendanceStats {
  totalPresent: number;
  totalLate: number;
  totalAbsent: number;
  totalExcused: number;
  attendanceRate: number;
  punctualityRate: number;
}

/**
 * Daily attendance summary
 */
export interface DailyAttendanceSummary {
  date: string;
  present: number;
  late: number;
  absent: number;
  excused: number;
  total: number;
  percentage: number;
}

/**
 * Mark attendance input
 */
export interface MarkAttendanceInput {
  studentCode: string;
  studentName: string;
  schoolId: string;
  schoolCode: string;
  courseCode?: string;
  date: string;
  status: AttendanceStatus;
  method?: AttendanceMethod;
  teacherCode?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
}


