/**
 * Logger Interface
 * Platform-agnostic logging that can be implemented differently in web and mobile
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';

export interface Logger {
  debug(tag: string, message: string, data?: unknown): void;
  info(tag: string, message: string, data?: unknown): void;
  warn(tag: string, message: string, data?: unknown): void;
  error(tag: string, message: string, data?: unknown): void;
  success(tag: string, message: string, data?: unknown): void;
}

/**
 * Default console logger implementation
 * Can be replaced with a custom logger for each platform
 */
class ConsoleLogger implements Logger {
  private formatMessage(level: LogLevel, tag: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${tag}] ${message}`;
  }

  debug(tag: string, message: string, data?: unknown): void {
    console.debug(this.formatMessage('debug', tag, message), data ?? '');
  }

  info(tag: string, message: string, data?: unknown): void {
    console.info(this.formatMessage('info', tag, message), data ?? '');
  }

  warn(tag: string, message: string, data?: unknown): void {
    console.warn(this.formatMessage('warn', tag, message), data ?? '');
  }

  error(tag: string, message: string, data?: unknown): void {
    console.error(this.formatMessage('error', tag, message), data ?? '');
  }

  success(tag: string, message: string, data?: unknown): void {
    console.log(this.formatMessage('success', tag, message), data ?? '');
  }
}

// Singleton logger instance
let loggerInstance: Logger = new ConsoleLogger();

/**
 * Set a custom logger implementation
 */
export function setLogger(customLogger: Logger): void {
  loggerInstance = customLogger;
}

/**
 * Get the current logger instance
 */
export function getLogger(): Logger {
  return loggerInstance;
}

// Export default logger for convenience
export const logger = {
  debug: (tag: string, message: string, data?: unknown) => loggerInstance.debug(tag, message, data),
  info: (tag: string, message: string, data?: unknown) => loggerInstance.info(tag, message, data),
  warn: (tag: string, message: string, data?: unknown) => loggerInstance.warn(tag, message, data),
  error: (tag: string, message: string, data?: unknown) => loggerInstance.error(tag, message, data),
  success: (tag: string, message: string, data?: unknown) => loggerInstance.success(tag, message, data),
};


