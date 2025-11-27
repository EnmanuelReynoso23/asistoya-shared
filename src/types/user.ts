/**
 * User Types
 * Shared types for the user management system
 */

import type { Database } from './supabase';

// Base Supabase types
export type UserRow = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

/**
 * User role
 */
export type UserRole = 'admin' | 'teacher' | 'parent' | 'student' | 'ceo';

/**
 * User metadata
 */
export interface UserMetadata {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  timezone?: string;
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

/**
 * Unified User interface
 */
export interface User {
  id: string;
  email?: string;
  name?: string;
  photoUrl?: string;
  role: UserRole;
  roles?: UserRole[];
  activeRole?: UserRole;
  schoolId?: string;
  children?: string[];
  classrooms?: string[];
  onboardingCompleted?: boolean;
  planId?: string;
  planSelectedAt?: string;
  subscriptionStatus?: string;
  metadata?: UserMetadata;
  lastSeen?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Auth user (from Supabase Auth)
 */
export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  emailConfirmedAt?: string;
  phoneConfirmedAt?: string;
  lastSignInAt?: string;
  appMetadata?: Record<string, unknown>;
  userMetadata?: Record<string, unknown>;
  createdAt: string;
}

/**
 * Sign up data
 */
export interface SignUpData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  schoolId?: string;
}

/**
 * Sign in data
 */
export interface SignInData {
  email: string;
  password: string;
}


