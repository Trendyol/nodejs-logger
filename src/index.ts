import { GraylogAdapter } from './adapters/graylog-adapter';
import { ConsoleAdapter } from './adapters/console-adapter';
import { ExpressLogContextMiddleware } from './middlewares/express-log-context-middleware';
import { Logger } from './logger/logger';
import { Action } from './actions/actions';

export = {
  GraylogAdapter,
  ConsoleAdapter,
  ExpressLogContextMiddleware,
  Logger,
  Action
};
