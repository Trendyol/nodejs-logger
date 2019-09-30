import express from 'express';
import { Request, ExpressLogContextMiddlewareOptions } from '../types';
import uuid from 'uuid/v4';

const defaultOptions: ExpressLogContextMiddlewareOptions = {
  generateCorrelationId: false
};

const expressLogContextMiddleware = (options: ExpressLogContextMiddlewareOptions = defaultOptions) => {
  return (req: Request, res: express.Response, next: express.NextFunction) => {
    req.logContext = {
      currentUrl: req.originalUrl,
      userAgent: req.header('user-agent') || req.header('x-user-agent'),
      refererUrl: req.header('referer'),
      correlationId: req.header('x-correlation-id') || req.header('x-correlationid'),
      ip:
        req.header('X-Client-IP') ||
        req.header('CF-Connecting-IP') ||
        req.header('Client-IP') ||
        req.header('x-real-ip') ||
        req.ip
    };

    if (req.user) {
      req.logContext.userId = req.user.id;
    }

    if (options.generateCorrelationId && !req.logContext.correlationId) {
      req.logContext.correlationId = uuid();
    }

    next();
  };
};

export { expressLogContextMiddleware };
