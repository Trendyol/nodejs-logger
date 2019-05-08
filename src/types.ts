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
}

interface LoggerProps {
  adapter: Adapter;
}

interface RequestContext {
  currentUrl: string;
  userId?: string;
  ip: string;
  userAgent: string;
  refererUrl: string;
  correlationId: string;
}

interface Request extends express.Request {
  logContext?: LogContext;
  user?: any;
}

interface Detail extends RequestContext {
  action: Action;
  customAction?: string;
}

export { GraylogConfig, Adapter, AdapterLog, LoggerProps, RequestContext, Detail, Request };
