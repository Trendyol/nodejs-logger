import { mapLogDetail } from '../../src/mappers/logMapper';
import { RequestContext } from '../../src/types';
import fr from 'fixture-repository';
import { Action } from '../../src/actions/actions';

describe('logMapper specs', () => {
  it('should create an instance of logMapper', () => {
    expect(mapLogDetail).toBeDefined();
  });

  it('should map log properties correctly when action is not custom', () => {
    const requestContext: RequestContext = fr.create('RequestContext');
    const action: Action = Action.PDA_GET_DETAIL;

    const result = mapLogDetail(action, requestContext);

    expect(result).toEqual({ action, ...requestContext });
  });

  it('should map log properties correctly when action is custom', () => {
    const requestContext: RequestContext = fr.create('RequestContext');
    const action: string = fr.create('string');

    const result = mapLogDetail((action as unknown) as Action, requestContext);

    expect(result).toEqual({ customAction: action, action: Action.CUSTOM, ...requestContext });
  });
});
