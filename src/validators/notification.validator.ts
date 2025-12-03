/**
 * Notification Validators
 * Zod schemas for notification validation
 */

import { z } from 'zod';

// ============================================
// Notification Schemas
// ============================================

/**
 * Notification type schema
 */
export const notificationTypeSchema = z.enum([
  'attendance',
  'alert',
  'announcement',
  'reminder',
  'system',
  'arrival',
  'departure',
  'absence',
]);

/**
 * Notification priority schema
 */
export const notificationPrioritySchema = z.enum(['low', 'normal', 'high', 'urgent']);

/**
 * Platform schema
 */
export const platformSchema = z.enum(['ios', 'android', 'web']);

/**
 * Create notification schema
 */
export const createNotificationSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  title: z.string().min(1, 'Title is required').max(100),
  message: z.string().min(1, 'Message is required').max(500),
  type: notificationTypeSchema.optional().default('system'),
  priority: notificationPrioritySchema.optional().default('normal'),
  actionUrl: z.string().url('Invalid action URL').optional(),
  data: z.record(z.unknown()).optional(),
});

/**
 * Send push notification schema
 */
export const sendPushNotificationSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  title: z.string().min(1, 'Title is required').max(100),
  body: z.string().min(1, 'Body is required').max(500),
  data: z.record(z.string()).optional(),
  badge: z.number().int().min(0).optional(),
});

/**
 * Send bulk push notification schema
 */
export const sendBulkPushNotificationSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1, 'At least one user ID is required'),
  title: z.string().min(1, 'Title is required').max(100),
  body: z.string().min(1, 'Body is required').max(500),
  data: z.record(z.string()).optional(),
});

/**
 * Register device token schema
 */
export const registerDeviceTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  platform: platformSchema,
  deviceId: z.string().optional(),
  deviceName: z.string().optional(),
});

/**
 * Mark notification read schema
 */
export const markNotificationReadSchema = z.object({
  notificationId: z.string().uuid('Invalid notification ID'),
});

/**
 * Mark all notifications read schema
 */
export const markAllNotificationsReadSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
});

// Type exports (prefixed with Validated to avoid conflicts with types)
export type ValidatedCreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type ValidatedSendPushNotificationInput = z.infer<typeof sendPushNotificationSchema>;
export type ValidatedSendBulkPushNotificationInput = z.infer<typeof sendBulkPushNotificationSchema>;
export type ValidatedRegisterDeviceTokenInput = z.infer<typeof registerDeviceTokenSchema>;
export type ValidatedMarkNotificationReadInput = z.infer<typeof markNotificationReadSchema>;
export type ValidatedMarkAllNotificationsReadInput = z.infer<typeof markAllNotificationsReadSchema>;
