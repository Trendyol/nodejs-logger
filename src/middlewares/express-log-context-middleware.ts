import express from 'express';
import { Request } from '../types';

const ExpressLogContextMiddleware = () => {
  return (req: Request, res: express.Response, next: express.NextFunction) => {
    req.logContext = {
      currentUrl: req.originalUrl,
      userAgent: req.header('user-agent'),
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

    next();
  };
};

export { ExpressLogContextMiddleware };
