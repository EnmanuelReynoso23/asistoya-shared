/**
 * Realtime Types
 * Types for real-time subscriptions and events
 */

import type { AttendanceRecord, AttendanceStatus } from './attendance';
import type { Notification } from './notification';

// ============================================
// Realtime Event Types
// ============================================

/**
 * Realtime event types
 */
export type RealtimeEventType = 'INSERT' | 'UPDATE' | 'DELETE';

/**
 * Base realtime payload
 */
export interface RealtimePayload<T> {
  eventType: RealtimeEventType;
  new: T | null;
  old: T | null;
  timestamp: string;
}

// ============================================
// Attendance Realtime Types
// ============================================

/**
 * Attendance realtime event
 */
export interface AttendanceRealtimeEvent {
  type: 'attendance';
  eventType: RealtimeEventType;
  record: AttendanceRecord;
  schoolId: string;
  courseCode?: string;
  timestamp: string;
}

/**
 * Attendance marked event
 */
export interface AttendanceMarkedEvent {
  studentCode: string;
  studentName: string;
  status: AttendanceStatus;
  date: string;
  time: string;
  courseCode?: string;
  markedBy?: string;
}

/**
 * Live attendance update
 */
export interface LiveAttendanceUpdate {
  schoolId: string;
  date: string;
  stats: {
    present: number;
    late: number;
    absent: number;
    total: number;
    percentage: number;
  };
  recentRecords: AttendanceRecord[];
}

// ============================================
// Notification Realtime Types
// ============================================

/**
 * Notification realtime event
 */
export interface NotificationRealtimeEvent {
  type: 'notification';
  eventType: RealtimeEventType;
  notification: Notification;
  userId: string;
  timestamp: string;
}

/**
 * New notification event
 */
export interface NewNotificationEvent {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  actionUrl?: string;
  createdAt: string;
}

// ============================================
// School Realtime Types
// ============================================

/**
 * School update event
 */
export interface SchoolUpdateEvent {
  type: 'school_update';
  schoolId: string;
  updateType: 'settings' | 'stats' | 'subscription' | 'status';
  data: Record<string, unknown>;
  timestamp: string;
}

// ============================================
// Course Realtime Types
// ============================================

/**
 * Course update event
 */
export interface CourseUpdateEvent {
  type: 'course_update';
  courseCode: string;
  schoolId: string;
  updateType: 'students' | 'teachers' | 'schedule' | 'settings' | 'status';
  data: Record<string, unknown>;
  timestamp: string;
}

// ============================================
// Subscription Types
// ============================================

/**
 * Subscription filter
 */
export interface SubscriptionFilter {
  column: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in';
  value: string | number | boolean | string[];
}

/**
 * Channel subscription options
 */
export interface ChannelSubscriptionOptions {
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  table: string;
  filter?: string;
}

/**
 * Subscription callback
 */
export type SubscriptionCallback<T> = (payload: RealtimePayload<T>) => void;

/**
 * Unsubscribe function
 */
export type Unsubscribe = () => void;

// ============================================
// Presence Types
// ============================================

/**
 * User presence
 */
export interface UserPresence {
  id: string;
  userId: string;
  name: string;
  role: string;
  schoolId?: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: string;
  currentPage?: string;
}

/**
 * Presence state
 */
export interface PresenceState {
  [key: string]: UserPresence[];
}

/**
 * Presence sync event
 */
export interface PresenceSyncEvent {
  type: 'sync' | 'join' | 'leave';
  key: string;
  newPresence?: UserPresence;
  leftPresence?: UserPresence;
  currentPresences: UserPresence[];
}
