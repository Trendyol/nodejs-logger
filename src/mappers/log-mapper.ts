import { LogContext, Detail, Message, AdapterLog } from '../types';
import { Action, ActionType } from '../actions/actions';

const mapLogDetail = (message: Message, action: ActionType, requestContext?: LogContext): AdapterLog => {
  const actionName = Action[action as Action];

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
    mapResult.action = Action.CUSTOM;
    mapResult.customAction = action;
  }

  if (typeof message !== 'string') {
    mappedMessage = JSON.stringify(message);
  }

  return { meta: mapResult, message: mappedMessage };
};

export { mapLogDetail };
