import { LogContext, Detail, Message, AdapterLog } from '../types';
import { Action, ActionType } from '../actions/actions';

const mapLogDetail = (message: Message, action: ActionType, requestContext?: LogContext): AdapterLog => {
  const actionName = Action[action as Action];

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
    mapResult.storefrontId = requestContext.storefrontId;
    mapResult.language = requestContext.language;
    mapResult.culture = requestContext.culture;
  }

  if (!actionName) {
    mapResult.action = action as Action;
  }

  return { message, meta: mapResult };
};

export { mapLogDetail };
