import LogMapper from '../../src/mappers/log-mapper';
import { LogContext, Message } from '../../src/types';
import fr from 'fixture-repository';
import { UNKNOWN_ACTION } from '../../src/actions/actions';

const knownAction = fr.create('string');

const actions = {
  knownAction
};

describe('logMapper specs', () => {
  let logMapper: LogMapper;

  beforeEach(() => {
    logMapper = new LogMapper(actions);
  });

  it('should create an instance of logMapper', () => {
    expect(logMapper).toBeDefined();
  });

  it('should map log properties correctly when action is not custom', () => {
    const requestContext: LogContext = fr.create('LogContext');
    const message: Message = fr.create('string');

    const result = logMapper.map(message, 'knownAction', requestContext);

    expect(result).toEqual({ message, meta: { action: knownAction, ...requestContext } });
  });

  it('should map log properties correctly when action is custom', () => {
    const requestContext: LogContext = fr.create('LogContext');
    const action: string = fr.create('string');
    const message: Message = fr.create('string');

    const result = logMapper.map(message, action, requestContext);

    expect(result).toEqual({ message, meta: { customAction: action, action: UNKNOWN_ACTION, ...requestContext } });
  });

  it('should map log properties correctly when logContext undefined with object message', () => {
    const action: string = fr.create('string');
    const message: Message = {
      test: fr.create('string')
    };
    const stringMessage = JSON.stringify(message);

    const result = logMapper.map(message, action);

    expect(result).toEqual({ message: stringMessage, meta: { customAction: action, action: UNKNOWN_ACTION } });
  });
});
