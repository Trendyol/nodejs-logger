import { GraylogAdapter } from '../../src/adapters/graylog-adapter';
import { AdapterLog, GraylogConfig } from '../../src/types';
import { random } from 'faker';
import { graylog } from 'graylog2';
import { createSandbox } from 'sinon';

const sandbox = createSandbox();

const config: GraylogConfig = {
  hostname: random.word(),
  host: random.word(),
  port: random.number({ min: 0, max: 100 }),
  facility: random.word(),
  bufferSize: random.number()
};
const log: AdapterLog = {
  message: random.word(),
  meta: {
    some: random.word()
  }
};

const adapter = new GraylogAdapter(config);

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
    adapter.warning(log);
    expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
  });
});
