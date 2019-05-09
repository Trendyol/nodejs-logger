import {Adapter, LoggerProps, LogContext} from '../types';
import { mapLogDetail } from '../mappers/logMapper';
import { Action } from '../actions/actions';

class Logger {
  private adapter: Adapter;
  constructor(props: LoggerProps) {
    this.adapter = props.adapter;
  }

  public info(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapter.info({ message, meta: logDetail });
  }

  public error(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapter.error({ message, meta: logDetail });
  }

  public warn(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapter.warn({ message, meta: logDetail });
  }

  public debug(action: Action, message: string, requestContext: LogContext) {
    const logDetail = mapLogDetail(action, requestContext);

    this.adapter.debug({ message, meta: logDetail });
  }
}

export { Logger };
