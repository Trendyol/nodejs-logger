import { LogContext, Detail } from '../types';
import { Action } from '../actions/actions';

const mapLogDetail = (action: Action, requestContext: LogContext) => {
  const mapResult: Detail = {
    action: Action[action],
    currentUrl: requestContext.currentUrl,
    ip: requestContext.ip,
    userAgent: requestContext.userAgent,
    refererUrl: requestContext.refererUrl,
    correlationId: requestContext.correlationId,
    userId: requestContext.userId
  };

  if (!Action[action]) {
    mapResult.action = Action.CUSTOM;
    mapResult.customAction = action;
  }

  return mapResult;
};

export { mapLogDetail };
