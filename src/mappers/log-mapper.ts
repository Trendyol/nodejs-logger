import { LogContext, Detail, Message, AdapterLog } from '../types';
import { Action, UNKNOWN_ACTION } from '../actions/actions';

export default class LogMapper {
  private actions: Action;
  constructor(actions: Action) {
    this.actions = actions;
  }
  public map(message: Message, action: string, requestContext?: LogContext): AdapterLog {
    const actionName = this.actions[action];

    const mapResult: Detail = {
      action: actionName
    };

    let mappedMessage = message;

    if (requestContext) {
      mapResult.currentUrl = requestContext.currentUrl;
      mapResult.ip = requestContext.ip;
      mapResult.userAgent = requestContext.userAgent;
      mapResult.refererUrl = requestContext.refererUrl;
      mapResult.correlationId = requestContext.correlationId;
      mapResult.userId = requestContext.userId;
    }

    if (!actionName) {
      mapResult.action = UNKNOWN_ACTION;
      mapResult.customAction = action;
    }

    if (typeof message !== 'string') {
      mappedMessage = JSON.stringify(message);
    }

    return { meta: mapResult, message: mappedMessage };
  }
}

export { LogMapper };
