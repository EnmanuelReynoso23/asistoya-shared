/**
 * Supabase Authentication Service
 * Platform-agnostic authentication service
 */

import type { User, AuthError, Session } from '@supabase/supabase-js';
import type { SignUpData, SignInData, User as AppUser, UserRole } from '../../types/user';
import { getSupabase } from '../client';
import { logger } from '../logger';

export interface SupabaseUser {
  id: string;
  email?: string;
  name?: string;
  role: string;
  roles?: string[];
  activeRole?: string;
  schoolId?: string;
  photoUrl?: string;
  createdAt: string;
  lastSeen?: string;
}

class AuthService {
  /**
   * Sign up a new user
   */
  async signUp(data: SignUpData): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const supabase = getSupabase();
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: data.role || 'parent',
          },
        },
      });

      if (authError) {
        return { user: null, error: authError };
      }

      // Create user profile in users table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            name: data.name,
            role: data.role || 'parent',
            roles: [data.role || 'parent'],
            active_role: data.role || 'parent',
            school_id: data.schoolId,
            created_at: new Date().toISOString(),
          });

        if (profileError) {
          logger.error('AuthService', 'Error creating user profile', profileError);
        }
      }

      return { user: authData.user, error: null };
    } catch (error) {
      logger.error('AuthService', 'Sign up error', error);
      return { user: null, error: error as AuthError };
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(data: SignInData): Promise<{ user: User | null; error: AuthError | null }> {
    try {
      const supabase = getSupabase();
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return { user: null, error };
      }

      // Update last seen
      if (authData.user) {
        await this.updateLastSeen(authData.user.id);
      }

      return { user: authData.user, error: null };
    } catch (error) {
      logger.error('AuthService', 'Sign in error', error);
      return { user: null, error: error as AuthError };
    }
  }

  /**
   * Sign out
   */
  async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      logger.error('AuthService', 'Sign out error', error);
      return { error: error as AuthError };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      logger.error('AuthService', 'Get current user error', error);
      return null;
    }
  }

  /**
   * Get current user profile from database
   */
  async getCurrentUserProfile(): Promise<SupabaseUser | null> {
    try {
      const user = await this.getCurrentUser();
      if (!user) return null;

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        logger.error('AuthService', 'Get user profile error', error);
        return null;
      }

      return this.mapDatabaseUserToSupabaseUser(data);
    } catch (error) {
      logger.error('AuthService', 'Get current user profile error', error);
      return null;
    }
  }

  /**
   * Get current session
   */
  async getSession(): Promise<Session | null> {
    try {
      const supabase = getSupabase();
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      logger.error('AuthService', 'Get session error', error);
      return null;
    }
  }

  /**
   * Reset password
   */
  async resetPassword(email: string, redirectUrl?: string): Promise<{ error: AuthError | null }> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      return { error };
    } catch (error) {
      logger.error('AuthService', 'Reset password error', error);
      return { error: error as AuthError };
    }
  }

  /**
   * Update password
   */
  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      return { error };
    } catch (error) {
      logger.error('AuthService', 'Update password error', error);
      return { error: error as AuthError };
    }
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: Partial<SupabaseUser>): Promise<{ error: unknown }> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      return { error };
    } catch (error) {
      logger.error('AuthService', 'Update user profile error', error);
      return { error };
    }
  }

  /**
   * Update last seen timestamp
   */
  private async updateLastSeen(userId: string): Promise<void> {
    try {
      const supabase = getSupabase();
      await supabase
        .from('users')
        .update({ last_seen: new Date().toISOString() })
        .eq('id', userId);
    } catch (error) {
      logger.error('AuthService', 'Update last seen error', error);
    }
  }

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    const supabase = getSupabase();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.debug('AuthService', `Auth state changed: ${event}`);
        
        if (session?.user) {
          await this.updateLastSeen(session.user.id);
        }

        callback(session?.user || null);
      }
    );

    return subscription;
  }

  /**
   * Map database user to SupabaseUser type
   */
  private mapDatabaseUserToSupabaseUser(data: Record<string, unknown>): SupabaseUser {
    return {
      id: data.id as string,
      email: data.email as string | undefined,
      name: data.name as string | undefined,
      role: data.role as string,
      roles: data.roles as string[] | undefined,
      activeRole: data.active_role as string | undefined,
      schoolId: data.school_id as string | undefined,
      photoUrl: data.photo_url as string | undefined,
      createdAt: data.created_at as string,
      lastSeen: data.last_seen as string | undefined,
    };
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<SupabaseUser | null> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        logger.error('AuthService', 'Get user by ID error', error);
        return null;
      }

      return this.mapDatabaseUserToSupabaseUser(data);
    } catch (error) {
      logger.error('AuthService', 'Get user by ID error', error);
      return null;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;


