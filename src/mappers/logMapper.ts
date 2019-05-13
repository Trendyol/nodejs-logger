import { LogContext, Detail } from '../types';
import { Action } from '../actions/actions';

const mapLogDetail = (action: Action, requestContext?: LogContext) => {
  const actionName = Action[action];

  const mapResult: Detail = {
    action: actionName
  };

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

  return mapResult;
};

export { mapLogDetail };
