import express from 'express';

interface GraylogConfig {
  hostname: string;
  host: string;
  port: number;
  facility: string;
  bufferSize: number;
}

interface AdapterLog {
  message: string;
  meta: { [key: string]: string };
}

interface Adapter {
  info: (log: AdapterLog) => void;
  error: (log: AdapterLog) => void;
  warning: (log: AdapterLog) => void;
}

interface LogContext {
  currentUrl?: string;
  userId?: string | null;
  userAgent?: string;
  referrerUrl?: string;
  correlationId?: string;
}

interface Request extends express.Request {
  logContext?: LogContext;
  user?: any;
}

export { GraylogConfig, Adapter, AdapterLog, LogContext, Request };
