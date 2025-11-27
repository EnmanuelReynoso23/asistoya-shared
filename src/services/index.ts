/**
 * @asistoya/shared-services
 * Shared services for AsistoYa monorepo
 * Platform-agnostic services that work on both web and mobile
 */

// Client initialization
export { 
  initSupabase, 
  getSupabase, 
  resetSupabase,
  STORAGE_BUCKETS,
  type SupabaseConfig,
  type SupabaseClient 
} from './client';

// Logger
export { 
  logger, 
  setLogger, 
  getLogger,
  type Logger,
  type LogLevel 
} from './logger';

// Errors
export {
  AppError,
  DatabaseError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  isPostgrestError,
  logError,
} from './errors';

// Services
export {
  authService,
  studentService,
  attendanceService,
  courseService,
  notificationService,
  type SupabaseUser,
} from './services';


