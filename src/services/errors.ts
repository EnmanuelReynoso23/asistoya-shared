/**
 * Custom Error Classes
 * Shared error types for the application
 */

import { PostgrestError } from '@supabase/supabase-js';
import { logger } from './logger';

/**
 * Base application error
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string = 'APP_ERROR', statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Database error
 */
export class DatabaseError extends AppError {
  constructor(message: string, code: string = 'DATABASE_ERROR') {
    super(message, code, 500);
    this.name = 'DatabaseError';
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  static fromPostgrestError(error: PostgrestError): DatabaseError {
    return new DatabaseError(error.message, error.code);
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  public readonly field: string;

  constructor(field: string, message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    this.field = field;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  public readonly resource: string;

  constructor(resource: string, message?: string) {
    super(message || `${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
    this.resource = resource;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Unauthorized error
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * Check if an error is a PostgrestError
 */
export function isPostgrestError(error: unknown): error is PostgrestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'details' in error
  );
}

/**
 * Log and handle errors consistently
 */
export function logError(context: string, error: unknown, extra?: Record<string, unknown>): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorCode = error instanceof AppError ? error.code : 'UNKNOWN';
  
  logger.error(context, errorMessage, {
    code: errorCode,
    stack: error instanceof Error ? error.stack : undefined,
    ...extra,
  });
}


