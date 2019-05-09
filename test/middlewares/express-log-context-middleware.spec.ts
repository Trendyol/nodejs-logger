const ExpressLogContextMiddleware = require('../../src/middlewares/express-log-context-middleware');
import { random } from 'faker';
import { createSandbox } from 'sinon';

const sandbox = createSandbox();

describe('express context middleware specs', () => {
  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it('should create express context middleware', () => {
    const spy = sandbox.spy();
    const req: any = {
      originalUrl: random.word(),
      header: sandbox.stub().returnsArg(0),
      user: {
        id: random.number()
      }
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(spy.calledOnce).toBe(true);
    expect(req.logContext).toBeDefined();
    expect(req.logContext.currentUrl).toBe(req.originalUrl);
    expect(req.logContext.userAgent).toBe('user-agent');
    expect(req.logContext.refererUrl).toBe('referer');
    expect(req.logContext.correlationId).toBe('x-correlation-id');
    expect(req.logContext.userId).toBe(req.user.id);
  });

  it('should create express context middleware without user info', () => {
    const spy = sandbox.spy();
    const req: any = {
      originalUrl: random.word(),
      header: sandbox.stub().returnsArg(0)
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.userId).toBeUndefined();
  });
});
