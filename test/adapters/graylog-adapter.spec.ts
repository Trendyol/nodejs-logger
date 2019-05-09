import { GraylogAdapter } from '../../src/adapters/graylog-adapter';
import { AdapterLog, GraylogConfig, Adapter } from '../../src/types';
import { random } from 'faker';
import { graylog } from 'graylog2';
import { createSandbox } from 'sinon';
import fr from 'fixture-repository';

const sandbox = createSandbox();

const config: GraylogConfig = { ...fr.create('GraylogConfig'), port: random.number({ min: 0, max: 100 }) };

const log: AdapterLog = fr.create('AdapterLog');

const adapter: Adapter = new GraylogAdapter(config);

describe('graylog adapter specs', () => {
  beforeEach(() => {
    sandbox.verifyAndRestore();
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
});
