import { ConsoleAdapter } from '../../src/adapters/console-adapter';
import { AdapterLog, Adapter } from '../../src/types';
import { createSandbox } from 'sinon';
import fr from 'fixture-repository';

const sandbox = createSandbox();

const log: AdapterLog = { meta: fr.create('Detail'), message: { data: 'some data' } };

describe('console adapter specs', () => {
  let adapter: Adapter;
  beforeEach(() => {
    adapter = new ConsoleAdapter();
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  describe('with test env', () => {
    it('should merge log data', () => {
      const sampleLog: any = {
        meta: { action: 'PRODUCT_DETAIL_API_PRODUCT_CONTENTS' },
        message: { data: 'some data' }
      };
      const result = ConsoleAdapter.mergeLog(sampleLog);
      expect(result).toBe('{"data":"some data","action":"PRODUCT_DETAIL_API_PRODUCT_CONTENTS"}');
    });

    it('should merge log data with string message', () => {
      const sampleLog: any = { meta: { action: 'PRODUCT_DETAIL_API_PRODUCT_CONTENTS' }, message: 'some message' };
      const result = ConsoleAdapter.mergeLog(sampleLog);
      expect(result).toBe('{"message":"some message","action":"PRODUCT_DETAIL_API_PRODUCT_CONTENTS"}');
    });

    it('should send info log', () => {
      const stub = sandbox.stub(console, 'info');
      const mockLog = 'sample log';
      sandbox.stub(ConsoleAdapter, 'mergeLog').returns(mockLog);
      adapter.info(log);
      expect(stub.calledWithExactly(mockLog)).toBe(true);
    });

    it('should send error log', () => {
      const stub = sandbox.stub(console, 'error');
      const mockLog = 'sample log';
      sandbox.stub(ConsoleAdapter, 'mergeLog').returns(mockLog);
      adapter.error(log);
      expect(stub.calledWithExactly(mockLog)).toBe(true);
    });

    it('should send warning log', () => {
      const stub = sandbox.stub(console, 'warn');
      const mockLog = 'sample log';
      sandbox.stub(ConsoleAdapter, 'mergeLog').returns(mockLog);
      adapter.warn(log);
      expect(stub.calledWithExactly(mockLog)).toBe(true);
    });

    it('should send debug log', () => {
      const stub = sandbox.stub(console, 'debug');
      const mockLog = 'sample log';
      sandbox.stub(ConsoleAdapter, 'mergeLog').returns(mockLog);
      adapter.debug(log);
      expect(stub.calledWithExactly(mockLog)).toBe(true);
    });
  });

  describe('with production env', () => {
    let adapter: Adapter;

    beforeEach(() => {
      process.env.DISABLE_CONSOLE_ERROR = 'true';
      adapter = new ConsoleAdapter();
    });

    afterEach(() => {
      sandbox.verifyAndRestore();
    });

    it('validate should return false', () => {
      const result = adapter.validate();
      expect(result).toBe(false);
    });
  });
});
