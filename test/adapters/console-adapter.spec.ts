import { ConsoleAdapter } from '../../src/adapters/console-adapter';
import { AdapterLog, Adapter } from '../../src/types';
import { createSandbox } from 'sinon';
import fr from 'fixture-repository';

const sandbox = createSandbox();

const log: AdapterLog = fr.create('AdapterLog');

const adapter: Adapter = new ConsoleAdapter();

describe('console adapter specs', () => {
  beforeEach(() => {
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

  describe('with production env', () => {
    const prevNodeEnv = process.env.NODE_ENV;
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    afterEach(() => {
      process.env.NODE_ENV = prevNodeEnv;
    });

    it('should send info log', () => {
      const stub = sandbox.stub(console, 'info');
      adapter.info(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(false);
    });

    it('should send error log', () => {
      const stub = sandbox.stub(console, 'error');
      adapter.error(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(false);
    });

    it('should send warning log', () => {
      const stub = sandbox.stub(console, 'warn');
      adapter.warn(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(false);
    });

    it('should send debug log', () => {
      const stub = sandbox.stub(console, 'debug');
      adapter.debug(log);
      expect(stub.calledWithExactly(log.message, log.meta)).toBe(false);
    });
  });
});
