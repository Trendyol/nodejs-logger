import { GraylogAdapter } from '../../src/adapters/graylog-adapter';
import { AdapterLog, GraylogConfig, Adapter } from '../../src/types';
import { random } from 'faker';
import { graylog } from 'graylog2';
import { createSandbox } from 'sinon';
import fr from 'fixture-repository';

const sandbox = createSandbox();

const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };
const log: AdapterLog = { meta: fr.create('Detail'), message: {} };

const adapter: Adapter = new GraylogAdapter(config);

describe('graylog adapter specs', () => {
  beforeEach(() => {
    sandbox.verifyAndRestore();
  });

  it('should create adapter with default buffer size', () => {
    const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };
    delete config.bufferSize;
    const adapter: Adapter = new GraylogAdapter(config);

    expect(adapter).toBeDefined();
  });

  it('should send info log', () => {
    const stub = sandbox.stub(graylog.prototype, 'info');
    adapter.info(log);
    expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
  });

  it('should send error log', () => {
    const stub = sandbox.stub(graylog.prototype, 'error');
    adapter.error(log);
    expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
  });

  it('should send warning log', () => {
    const stub = sandbox.stub(graylog.prototype, 'warning');
    adapter.warn(log);
    expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
  });

  it('should send debug log', () => {
    const stub = sandbox.stub(graylog.prototype, 'debug');
    adapter.debug(log);
    expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
  });

  it('validate should return true', () => {
    const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };

    const adapter: Adapter = new GraylogAdapter(config);

    expect(adapter.validate()).toBe(true);
  });

  it('validate should return false if facility not given', () => {
    const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };
    delete config.facility;

    const adapter: Adapter = new GraylogAdapter(config);

    expect(adapter.validate()).toBe(false);
  });

  it('validate should return false if hostname not given', () => {
    const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };
    delete config.hostname;

    const adapter: Adapter = new GraylogAdapter(config);

    expect(adapter.validate()).toBe(false);
  });

  it('validate should return false if host not given', () => {
    const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };
    delete config.host;

    const adapter: Adapter = new GraylogAdapter(config);

    expect(adapter.validate()).toBe(false);
  });

  it('validate should return false if port not given', () => {
    const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };
    delete config.port;

    const adapter: Adapter = new GraylogAdapter(config);

    expect(adapter.validate()).toBe(false);
  });
});
