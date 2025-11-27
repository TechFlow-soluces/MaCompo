import { config } from '@config/env';

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

const levelMap: Record<string, LogLevel> = {
  debug: LogLevel.DEBUG,
  info: LogLevel.INFO,
  warn: LogLevel.WARN,
  error: LogLevel.ERROR,
};

const currentLevel = levelMap[config.log.level] || LogLevel.INFO;

const formatMessage = (level: string, message: string, meta?: unknown): string => {
  const timestamp = new Date().toISOString();
  const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
};

export const logger = {
  debug: (message: string, meta?: unknown): void => {
    if (currentLevel <= LogLevel.DEBUG) {
      console.log(formatMessage('debug', message, meta));
    }
  },
  info: (message: string, meta?: unknown): void => {
    if (currentLevel <= LogLevel.INFO) {
      console.log(formatMessage('info', message, meta));
    }
  },
  warn: (message: string, meta?: unknown): void => {
    if (currentLevel <= LogLevel.WARN) {
      console.warn(formatMessage('warn', message, meta));
    }
  },
  error: (message: string, meta?: unknown): void => {
    if (currentLevel <= LogLevel.ERROR) {
      console.error(formatMessage('error', message, meta));
    }
  },
};
