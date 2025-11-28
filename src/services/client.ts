/**
 * Supabase Client Factory
 * Creates a Supabase client that works in both web and mobile environments
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  options?: {
    persistSession?: boolean;
    autoRefreshToken?: boolean;
    detectSessionInUrl?: boolean;
    storage?: any; // AsyncStorage for mobile, localStorage for web
  };
}

let supabaseInstance: SupabaseClient<Database> | null = null;

/**
 * Initialize the Supabase client
 * Must be called before using any services
 */
export function initSupabase(config: SupabaseConfig): SupabaseClient<Database> {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  if (!config.url || !config.anonKey) {
    throw new Error('Supabase URL and Anon Key are required');
  }

  supabaseInstance = createClient<Database>(config.url, config.anonKey, {
    auth: {
      persistSession: config.options?.persistSession ?? true,
      autoRefreshToken: config.options?.autoRefreshToken ?? true,
      detectSessionInUrl: config.options?.detectSessionInUrl ?? true,
      storage: config.options?.storage,
    },
  });

  return supabaseInstance;
}

/**
 * Get the Supabase client instance
 * Throws if client hasn't been initialized
 */
export function getSupabase(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    throw new Error('Supabase client not initialized. Call initSupabase() first.');
  }
  return supabaseInstance;
}

/**
 * Reset the Supabase client (useful for testing)
 */
export function resetSupabase(): void {
  supabaseInstance = null;
}

// Storage bucket names
export const STORAGE_BUCKETS = {
  STUDENT_PHOTOS: 'student-photos',
  FACE_PROFILES: 'face-profiles',
  DOCUMENTS: 'documents',
  AVATARS: 'avatars',
  REPORTS: 'reports',
} as const;

export type { SupabaseClient };


