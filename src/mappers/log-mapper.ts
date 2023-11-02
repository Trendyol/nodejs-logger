import { LogContext, Detail, Message, AdapterLog } from '../types';
import { Action, ActionType } from '../actions/actions';

const mapLogDetail = (
  message: Message,
  action: ActionType,
  requestContext?: LogContext,
  isDoubleStringifyEnabled?: boolean
): AdapterLog => {
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
    mapResult.storefrontId = requestContext.storefrontId;
    mapResult.language = requestContext.language;
    mapResult.culture = requestContext.culture;
  }

  if (!actionName) {
    mapResult.action = action as Action;
  }

  if (isDoubleStringifyEnabled && typeof message !== 'string') {
    try {
      mappedMessage = JSON.stringify(message, null, 4);
    } catch (err) {
      mappedMessage = JSON.stringify(err, null, 4);
    }
  }

  return { message: mappedMessage, meta: mapResult };
};

export { mapLogDetail };
