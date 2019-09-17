import { ConsoleAdapter } from '../../src/adapters/console-adapter';
import { AdapterLog, Adapter } from '../../src/types';
import { createSandbox } from 'sinon';
import fr from 'fixture-repository';

const sandbox = createSandbox();

const log: AdapterLog = { meta: fr.create('Detail'), message: {} };

describe('console adapter specs', () => {
  let adapter: Adapter;
  beforeEach(() => {
    adapter = new ConsoleAdapter();
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  describe('with test env', () => {
    it('should send info log', () => {
      const stub = sandbox.stub(console, 'info');
      adapter.info(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
    });

    it('should send error log', () => {
      const stub = sandbox.stub(console, 'error');
      adapter.error(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
    });

    it('should send warning log', () => {
      const stub = sandbox.stub(console, 'warn');
      adapter.warn(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
    });

    it('should send debug log', () => {
      const stub = sandbox.stub(console, 'debug');
      adapter.debug(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(true);
    });
  });

  describe('with CONSOLE_LOG_ENABLED false', () => {
    const prevConfig = process.env.CONSOLE_LOG_ENABLED;
    let adapter: Adapter;

    beforeEach(() => {
      adapter = new ConsoleAdapter();
    });

    afterEach(() => {
      sandbox.verifyAndRestore();
    });

    afterEach(() => {
      process.env.CONSOLE_LOG_ENABLED = prevConfig;
    });

    it('validate should return true', () => {
      process.env.CONSOLE_LOG_ENABLED = 'true';

      const result = adapter.validate();
      expect(result).toBe(true);
    });

    it('validate should return false', () => {
      process.env.CONSOLE_LOG_ENABLED = 'false';

      const result = adapter.validate();
      expect(result).toBe(false);
    });

    it('validate should return false when config is not enabled', () => {
      delete process.env.CONSOLE_LOG_ENABLED;

      const result = adapter.validate();
      expect(result).toBe(false);
    });
  });
});
