import { Logger } from '../src/index';

describe('index specs', () => {
  it('should run index.ts', () => {
    const logger = new Logger();

    expect(logger).toBeDefined();
  });
});
