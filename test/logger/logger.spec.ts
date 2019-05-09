import { Logger } from '../../src/logger/logger';
import { Adapter, GraylogConfig, LogContext, Detail, AdapterLog } from '../../src/types';
import { GraylogAdapter } from '../../src/adapters/graylog-adapter';
import fr from 'fixture-repository';
import faker from 'faker';
import { createSandbox, SinonStubbedInstance, SinonStub } from 'sinon';
import * as mapper from '../../src/mappers/logMapper';
import { Action } from '../../src/actions/actions';

const adapterConfig: GraylogConfig = { ...fr.create('GraylogConfig'), port: faker.random.number({ min: 0, max: 100 }) };
const adapter: Adapter = new GraylogAdapter(adapterConfig);
const sandbox = createSandbox();

const requestContext: LogContext = fr.create('LogContext');
const action: Action = fr.create('Action');
const message: string = fr.create('string');
const detail: Detail = fr.create('Detail');
let mapperStub: SinonStub<unknown[]>;

const log: AdapterLog = {
  message,
  meta: detail
};

describe('logger specs', () => {
  let logger: Logger;
  let mockAdapter: SinonStubbedInstance<Adapter>;

  beforeEach(() => {
    mapperStub = sandbox.stub(mapper, 'mapLogDetail').returns(detail);
    mockAdapter = sandbox.stub(adapter);
    logger = new Logger({ adapters: [mockAdapter] });
  });

  afterEach(() => {
    process.env.LOG_LEVEL = 'debug';
    sandbox.verifyAndRestore();
  });

  it('should create an instance of logger', () => {
    expect(logger).toBeDefined();
  });

  it('should call mapper with correct properties from info', () => {
    logger.info(action, message, requestContext);

    expect(mapperStub.calledWithExactly(action, requestContext)).toBe(true);
  });

  it('should call adapter.info with correct properties from info', () => {
    logger.info(action, message, requestContext);

    expect(mockAdapter.info.calledWithExactly(log)).toBe(true);
  });

  it('should call mapper with correct properties from error', () => {
    logger.error(action, message, requestContext);

    expect(mapperStub.calledWithExactly(action, requestContext)).toBe(true);
  });

  it('should call adapter.error with correct properties from error', () => {
    logger.error(action, message, requestContext);

    expect(mockAdapter.error.calledWithExactly(log)).toBe(true);
  });

  it('should call mapper with correct properties from warn', () => {
    logger.warn(action, message, requestContext);

    expect(mapperStub.calledWithExactly(action, requestContext)).toBe(true);
  });

  it('should call adapter.warn with correct properties from warn', () => {
    logger.warn(action, message, requestContext);

    expect(mockAdapter.warn.calledWithExactly(log)).toBe(true);
  });

  it('should call adapter.debug with correct properties from debug', () => {
    logger.debug(action, message, requestContext);

    expect(mockAdapter.debug.calledWithExactly(log)).toBe(true);
  });

  it('should log all levels when log level is debug', () => {
    logger.info(action, message, requestContext);
    logger.debug(action, message, requestContext);
    logger.warn(action, message, requestContext);
    logger.error(action, message, requestContext);

    expect(mockAdapter.error.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.warn.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.info.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.debug.calledWithExactly(log)).toBe(true);
  });

  it('should log all levels except debug when log level is info', () => {
    process.env.LOG_LEVEL = 'info';

    logger.info(action, message, requestContext);
    logger.debug(action, message, requestContext);
    logger.warn(action, message, requestContext);
    logger.error(action, message, requestContext);

    expect(mockAdapter.error.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.info.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.warn.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.debug.calledWithExactly(log)).toBe(false);
  });

  it('should only log error and warn levels when log level is warn', () => {
    process.env.LOG_LEVEL = 'warn';

    logger.info(action, message, requestContext);
    logger.debug(action, message, requestContext);
    logger.warn(action, message, requestContext);
    logger.error(action, message, requestContext);

    expect(mockAdapter.error.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.warn.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.info.calledWithExactly(log)).toBe(false);
    expect(mockAdapter.debug.calledWithExactly(log)).toBe(false);
  });

  it('should only log error level when log level is error', () => {
    process.env.LOG_LEVEL = 'error';

    logger.info(action, message, requestContext);
    logger.debug(action, message, requestContext);
    logger.warn(action, message, requestContext);
    logger.error(action, message, requestContext);

    expect(mockAdapter.error.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.warn.calledWithExactly(log)).toBe(false);
    expect(mockAdapter.info.calledWithExactly(log)).toBe(false);
    expect(mockAdapter.debug.calledWithExactly(log)).toBe(false);
  });

  it('should only log error and warn levels when log level is undefined', () => {
    delete process.env.LOG_LEVEL;

    logger.info(action, message, requestContext);
    logger.debug(action, message, requestContext);
    logger.warn(action, message, requestContext);
    logger.error(action, message, requestContext);

    expect(mockAdapter.error.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.warn.calledWithExactly(log)).toBe(true);
    expect(mockAdapter.info.calledWithExactly(log)).toBe(false);
    expect(mockAdapter.debug.calledWithExactly(log)).toBe(false);
  });
});
