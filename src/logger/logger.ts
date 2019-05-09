import { Adapter, LoggerProps, LogContext } from '../types';
import { mapLogDetail } from '../mappers/logMapper';
import { Action } from '../actions/actions';

class Logger {
  private adapters: Adapter[];
  constructor(props: LoggerProps) {
    this.adapters = props.adapters;
  }

  public info(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapters.forEach((adapter: Adapter) => adapter.info({ message, meta: logDetail }));
  }

  public error(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapters.forEach((adapter: Adapter) => adapter.error({ message, meta: logDetail }));
  }

  public warn(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapters.forEach((adapter: Adapter) => adapter.warn({ message, meta: logDetail }));
  }

  public debug(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapters.forEach((adapter: Adapter) => adapter.debug({ message, meta: logDetail }));
  }
}

export { Logger };
