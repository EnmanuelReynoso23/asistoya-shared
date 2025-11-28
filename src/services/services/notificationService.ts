/**
 * Supabase Notification Service
 * Platform-agnostic notification management service
 */

import type { 
  Notification, 
  DeviceToken,
  CreateNotificationInput,
  NotificationType,
  NotificationPriority 
} from '../../types/notification';
import { getSupabase } from '../client';
import { logger } from '../logger';
import { DatabaseError, isPostgrestError, logError } from '../errors';

class NotificationService {
  /**
   * Create a notification
   */
  async createNotification(input: CreateNotificationInput): Promise<Notification> {
    try {
      const supabase = getSupabase();
      const insertData = {
        user_id: input.userId,
        title: input.title,
        message: input.message,
        type: input.type || 'system',
        priority: input.priority || 'normal',
        action_url: input.actionUrl || null,
        data: (input.data || null) as Record<string, unknown> | null,
        delivery_method: input.deliveryMethod || ['in_app'],
        expires_at: input.expiresAt || null,
        read: false,
        delivered: false,
      };

      const { data, error } = await supabase
        .from('notifications')
        .insert(insertData as any)
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      logger.success('NotificationService', 'Notification created', { 
        userId: input.userId,
        type: input.type 
      });

      return this.mapDatabaseToNotification(data);
    } catch (error) {
      logError('NotificationService - createNotification', error);
      throw error;
    }
  }

  /**
   * Get notifications for a user
   */
  async getUserNotifications(userId: string, limit: number = 50): Promise<Notification[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToNotification);
    } catch (error) {
      logger.error('NotificationService', 'Error getting user notifications', { error });
      throw error;
    }
  }

  /**
   * Get unread notifications count
   */
  async getUnreadCount(userId: string): Promise<number> {
    try {
      const supabase = getSupabase();
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;
      return count || 0;
    } catch (error) {
      logger.error('NotificationService', 'Error getting unread count', { error });
      return 0;
    }
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<void> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('notifications')
        .update({ 
          read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('id', notificationId);

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }
    } catch (error) {
      logError('NotificationService - markAsRead', error);
      throw error;
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string): Promise<void> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('notifications')
        .update({ 
          read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }
    } catch (error) {
      logError('NotificationService - markAllAsRead', error);
      throw error;
    }
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string): Promise<void> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }
    } catch (error) {
      logError('NotificationService - deleteNotification', error);
      throw error;
    }
  }

  /**
   * Register device token for push notifications
   */
  async registerDeviceToken(
    userId: string,
    token: string,
    platform: 'ios' | 'android' | 'web',
    deviceInfo?: { deviceId?: string; deviceName?: string }
  ): Promise<DeviceToken> {
    try {
      const supabase = getSupabase();
      
      // Check if token already exists
      const { data: existing } = await supabase
        .from('device_tokens')
        .select('*')
        .eq('token', token)
        .maybeSingle();

      if (existing) {
        // Update existing token
        const { data, error } = await supabase
          .from('device_tokens')
          .update({
            user_id: userId,
            platform,
            device_id: deviceInfo?.deviceId || null,
            device_name: deviceInfo?.deviceName || null,
            is_active: true,
            last_used_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return this.mapDatabaseToDeviceToken(data);
      }

      // Create new token
      const { data, error } = await supabase
        .from('device_tokens')
        .insert({
          user_id: userId,
          token,
          platform,
          device_id: deviceInfo?.deviceId || null,
          device_name: deviceInfo?.deviceName || null,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }

      logger.success('NotificationService', 'Device token registered', { 
        userId, 
        platform 
      });

      return this.mapDatabaseToDeviceToken(data);
    } catch (error) {
      logError('NotificationService - registerDeviceToken', error);
      throw error;
    }
  }

  /**
   * Remove device token
   */
  async removeDeviceToken(token: string): Promise<void> {
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from('device_tokens')
        .delete()
        .eq('token', token);

      if (error) {
        if (isPostgrestError(error)) {
          throw new DatabaseError(error.message, error.code);
        }
        throw error;
      }
    } catch (error) {
      logError('NotificationService - removeDeviceToken', error);
      throw error;
    }
  }

  /**
   * Get device tokens for a user
   */
  async getUserDeviceTokens(userId: string): Promise<DeviceToken[]> {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('device_tokens')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (error) throw error;
      return (data || []).map(this.mapDatabaseToDeviceToken);
    } catch (error) {
      logger.error('NotificationService', 'Error getting device tokens', { error });
      throw error;
    }
  }

  /**
   * Subscribe to notifications (real-time)
   */
  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    const supabase = getSupabase();
    const channel = supabase
      .channel(`notifications-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(this.mapDatabaseToNotification(payload.new));
        }
      )
      .subscribe();

    return channel;
  }

  /**
   * Map database format to Notification interface
   */
  private mapDatabaseToNotification(data: any): Notification {
    return {
      id: data.id,
      userId: data.user_id || undefined,
      title: data.title,
      message: data.message,
      type: data.type as NotificationType || undefined,
      priority: data.priority as NotificationPriority || undefined,
      actionUrl: data.action_url || undefined,
      data: data.data || undefined,
      read: data.read || false,
      readAt: data.read_at || undefined,
      delivered: data.delivered || false,
      deliveryMethod: data.delivery_method || undefined,
      expiresAt: data.expires_at || undefined,
      createdAt: data.created_at || new Date().toISOString(),
    };
  }

  /**
   * Map database format to DeviceToken interface
   */
  private mapDatabaseToDeviceToken(data: any): DeviceToken {
    return {
      id: data.id,
      userId: data.user_id,
      token: data.token,
      platform: data.platform || undefined,
      deviceId: data.device_id || undefined,
      deviceName: data.device_name || undefined,
      isActive: data.is_active || false,
      lastUsedAt: data.last_used_at || undefined,
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at || new Date().toISOString(),
    };
  }
}

export const notificationService = new NotificationService();
export default notificationService;

