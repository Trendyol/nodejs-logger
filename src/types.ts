import express from 'express';
import { Action } from './actions/actions';

interface GraylogConfig {
  hostname: string;
  host: string;
  port: number;
  facility: string;
  bufferSize?: number;
}

interface AdapterLog {
  message: string | object;
  meta: Detail;
}

interface Adapter {
  info: (log: AdapterLog) => void;
  error: (log: AdapterLog) => void;
  warn: (log: AdapterLog) => void;
  debug: (log: AdapterLog) => void;

  validate: () => boolean;
}

interface LoggerProps {
  adapters: Adapter[];
  actions: Action;
}

interface LogContext {
  currentUrl?: string;
  ip?: string;
  userAgent?: string;
  correlationId?: string;
  refererUrl?: string;
}

interface Request extends express.Request {
  logContext: LogContext;
}

interface Detail extends LogContext {
  action: string;
  customAction?: string;
}

enum LogLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug'
}

type LevelMap = { [Tkey in LogLevel]: number };

type Message = string | object;

interface ExpressLogContextMiddlewareOptions {
  generateCorrelationId?: boolean;
}

export {
  GraylogConfig,
  Adapter,
  AdapterLog,
  LoggerProps,
  LogContext,
  Detail,
  Request,
  LogLevel,
  LevelMap,
  Message,
  ExpressLogContextMiddlewareOptions
};
