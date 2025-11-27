/**
 * Student Types
 * Shared types for the student management system
 */

import type { Database } from './supabase';

// Base Supabase types
export type StudentRow = Database['public']['Tables']['students']['Row'];
export type StudentInsert = Database['public']['Tables']['students']['Insert'];
export type StudentUpdate = Database['public']['Tables']['students']['Update'];

/**
 * Parent/Guardian contact information
 */
export interface ParentContact {
  id: string;
  name: string;
  relationship: 'father' | 'mother' | 'guardian' | 'other';
  phone?: string;
  email?: string;
  isPrimary: boolean;
}

/**
 * Student statistics
 */
export interface StudentStats {
  totalDays: number;
  totalLate: number;
  totalAbsent: number;
  totalPresent: number;
  currentStreak: number;
  longestStreak: number;
  attendanceRate: number;
}

/**
 * Student alert
 */
export interface StudentAlert {
  id: string;
  type: 'attendance' | 'grade' | 'behavior' | 'health' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

/**
 * Student achievement
 */
export interface StudentAchievement {
  id: string;
  achievementCode: string;
  achievementName: string;
  unlockedAt: string;
  progress: number;
}

/**
 * Note about a student
 */
export interface StudentNote {
  id: string;
  content: string;
  createdBy: string;
  createdByName?: string;
  createdAt: string;
  type: 'academic' | 'behavior' | 'health' | 'general';
  isPrivate: boolean;
}

/**
 * Student status
 */
export type StudentStatus = 
  | 'active' 
  | 'inactive' 
  | 'transferred' 
  | 'graduated' 
  | 'withdrawn' 
  | 'on_leave';

/**
 * Unified Student interface
 * Compatible with mock and Supabase
 */
export interface Student {
  id: string;
  code: string;
  studentCode: string;
  name: string;
  email?: string;
  photo?: string;
  grade: string;
  section?: string;
  courseCode?: string;
  schoolId: string;
  schoolCode: string;
  dateOfBirth?: Date;
  enrollmentDate?: Date;
  parentCodes: string[];
  parentIds: string[];
  parentContacts: ParentContact[];
  faceId?: string;
  status: StudentStatus;
  stats: StudentStats;
  alerts: StudentAlert[];
  achievements: StudentAchievement[];
  notes: StudentNote[];
  createdAt: string;
  updatedAt: string;
}


