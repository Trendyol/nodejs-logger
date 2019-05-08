import { Logger } from '../../src/logger/logger';
import { Adapter, GraylogConfig, RequestContext, Detail, AdapterLog } from '../../src/types';
import { GraylogAdapter } from '../../src/adapters/graylog-adapter';
import fr from 'fixture-repository';
import faker from 'faker';
import { createSandbox, SinonMock, SinonSpy, SinonStubbedInstance, SinonStub } from 'sinon';
import * as mapper from '../../src/mappers/logMapper';
import { Action } from '../../src/actions/actions';

const adapterConfig: GraylogConfig = { ...fr.create('GraylogConfig'), port: faker.random.number({ min: 0, max: 100 }) };
const adapter: Adapter = new GraylogAdapter(adapterConfig);
const sandbox = createSandbox();

const requestContext: RequestContext = fr.create('RequestContext');
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
    logger = new Logger({ adapter: mockAdapter });
  });

  afterEach(() => {
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

  it('should call adapter.error with correct properties from warn', () => {
    logger.warn(action, message, requestContext);

    expect(mockAdapter.warn.calledWithExactly(log)).toBe(true);
  });
});
