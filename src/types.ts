import express from 'express';
import { Action } from './actions/actions';

interface GraylogConfig {
  hostname: string;
  host: string;
  port: number;
  facility: string;
  bufferSize: number;
}

interface AdapterLog {
  message: string;
  meta: Detail;
}

interface Adapter {
  info: (log: AdapterLog) => void;
  error: (log: AdapterLog) => void;
  warn: (log: AdapterLog) => void;
  debug: (log: AdapterLog) => void;
}

interface LoggerProps {
  adapters: Adapter[];
}

interface LogContext {
  currentUrl?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  correlationId?: string;
  refererUrl?: string;
}

interface Request extends express.Request {
  logContext?: LogContext;
  user?: any;
}

interface Detail extends LogContext {
  action: Action;
  customAction?: string;
}

enum LogLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug'
}

type LevelMap = { [Tkey in LogLevel]: number };

export { GraylogConfig, Adapter, AdapterLog, LoggerProps, LogContext, Detail, Request, LogLevel, LevelMap };
