/**
 * School Types
 * Shared types for the school management system
 */

import type { Database } from './supabase';

// Base Supabase types
export type SchoolRow = Database['public']['Tables']['schools']['Row'];
export type SchoolInsert = Database['public']['Tables']['schools']['Insert'];
export type SchoolUpdate = Database['public']['Tables']['schools']['Update'];

/**
 * School onboarding data
 */
export interface SchoolOnboardingData {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  principal: string;
  estimatedStudents: number;
  estimatedTeachers: number;
  selectedPlan?: 'free' | 'basic' | 'premium' | 'enterprise';
  paymentMethod?: unknown;
  billingCycle?: string;
}

/**
 * School invitation
 */
export interface SchoolInvitation {
  id: string;
  schoolId: string;
  schoolCode: string;
  email: string;
  role: 'teacher' | 'admin';
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  token: string;
}

/**
 * School settings
 */
export interface SchoolSettings {
  timezone: string;
  language: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  academicYearStart: string;
  academicYearEnd: string;
  classStartTime: string;
  classEndTime: string;
  lateThresholdMinutes: number;
  autoMarkAbsent: boolean;
  autoMarkAbsentTime: string;
  requireFaceRecognition: boolean;
  allowManualCorrection: boolean;
  notifyParentsOnAbsence: boolean;
  notifyParentsOnLate: boolean;
}

/**
 * School subscription
 */
export interface SchoolSubscription {
  id?: string;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  status?: 'active' | 'inactive' | 'expired' | 'cancelled';
  startDate: string | Date;
  endDate: string;
  maxStudents: number;
  maxTeachers: number;
  features: string[];
  paymentStatus: 'active' | 'pending' | 'overdue' | 'cancelled';
  billingEmail: string;
  amount?: number;
  currency?: string;
  billingCycle?: 'monthly' | 'yearly';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * School statistics
 */
export interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  todayAttendance: {
    present: number;
    late: number;
    absent: number;
    notMarked: number;
    percentage: number;
  };
  monthlyStats: {
    avgAttendance: number;
    trend: 'up' | 'down' | 'stable';
    changePercentage: number;
  };
  weeklyAttendance: Array<{
    date: string;
    present: number;
    late: number;
    absent: number;
  }>;
}

/**
 * School status
 */
export type SchoolStatus = 'active' | 'inactive' | 'suspended';

/**
 * Unified School interface
 */
export interface School {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  zipCode?: string;
  phone: string;
  email: string;
  principal: string;
  adminId?: string;
  totalStudents: number;
  totalTeachers: number;
  logo?: string;
  settings: SchoolSettings;
  subscription: SchoolSubscription;
  status: SchoolStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}


