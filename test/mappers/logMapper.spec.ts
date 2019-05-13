import { mapLogDetail } from '../../src/mappers/logMapper';
import { LogContext } from '../../src/types';
import fr from 'fixture-repository';
import { Action } from '../../src/actions/actions';

describe('logMapper specs', () => {
  it('should create an instance of logMapper', () => {
    expect(mapLogDetail).toBeDefined();
  });

  it('should map log properties correctly when action is not custom', () => {
    const message: string = fr.create('string');
    const requestContext: LogContext = fr.create('LogContext');
    const action: Action = Action.FAVORITE_API_ADD_FAVORITE;

    const result = mapLogDetail(message, action, requestContext);

    expect(result).toEqual({ message, meta: { action, ...requestContext } });
  });

  it('should map log properties correctly when action is custom', () => {
    const message: string = fr.create('string');
    const requestContext: LogContext = fr.create('LogContext');
    const action: string = fr.create('string');

    const result = mapLogDetail(message, (action as unknown) as Action, requestContext);

    expect(result).toEqual({ message, meta: { customAction: action, action: Action.CUSTOM, ...requestContext } });
  });

  it('should map log properties correctly when message is object', () => {
    const message: object = { test: 'test' };
    const requestContext: LogContext = fr.create('LogContext');
    const action: string = fr.create('string');

    const result = mapLogDetail(message, (action as unknown) as Action, requestContext);

    expect(result).toEqual({
      message: JSON.stringify(message),
      meta: { customAction: action, action: Action.CUSTOM, ...requestContext }
    });
  });

  it('should map log properties correctly when logContext undefined', () => {
    const message: string = fr.create('string');
    const action: string = fr.create('string');

    const result = mapLogDetail(message, (action as unknown) as Action);

    expect(result).toEqual({ message, meta: { customAction: action, action: Action.CUSTOM } });
  });
});
