/**
 * Notification Types
 * Shared types for the notification system
 */

import type { Database } from './supabase';

// Base Supabase types
export type NotificationRow = Database['public']['Tables']['notifications']['Row'];
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert'];
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update'];

/**
 * Notification type
 */
export type NotificationType = 
  | 'attendance' 
  | 'alert' 
  | 'announcement' 
  | 'reminder' 
  | 'system'
  | 'arrival'
  | 'departure'
  | 'absence';

/**
 * Notification priority
 */
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

/**
 * Delivery method
 */
export type DeliveryMethod = 'push' | 'email' | 'sms' | 'in_app';

/**
 * Unified Notification interface
 */
export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  actionUrl?: string;
  data?: Record<string, unknown>;
  read: boolean;
  readAt?: string;
  delivered: boolean;
  deliveryMethod?: DeliveryMethod[];
  expiresAt?: string;
  createdAt: string;
}

/**
 * Device token for push notifications
 */
export interface DeviceToken {
  id: string;
  userId: string;
  token: string;
  platform?: 'ios' | 'android' | 'web';
  deviceId?: string;
  deviceName?: string;
  isActive: boolean;
  lastUsedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Push notification payload
 */
export interface PushNotificationPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
  badge?: number;
  sound?: string;
  icon?: string;
  image?: string;
}

/**
 * Create notification input
 */
export interface CreateNotificationInput {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  actionUrl?: string;
  data?: Record<string, unknown>;
  deliveryMethod?: DeliveryMethod[];
  expiresAt?: string;
}


