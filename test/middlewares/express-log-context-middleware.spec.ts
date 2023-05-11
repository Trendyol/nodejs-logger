import { ExpressLogContextMiddleware } from '../../src/middlewares/express-log-context-middleware';
import { random, lorem } from 'faker';
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
      },
      query: {
        storefrontId: random.number(),
        language: lorem.word(),
        culture: lorem.word()
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
    expect(req.logContext.storefrontId).toBe(req.query.storefrontId);
    expect(req.logContext.language).toBe(req.query.language);
    expect(req.logContext.culture).toBe(req.query.culture);
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

  it('should create express context middleware with X-Client-IP', () => {
    const spy = sandbox.spy();
    const ip = 'X-Client-IP';

    const headers = {
      'X-Client-IP': ip
    };

    const req: any = {
      header: headerName => headers[headerName]
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.ip).toBe(ip);
  });

  it('should create express context middleware with CF-Connecting-IP', () => {
    const spy = sandbox.spy();
    const ip = 'CF-Connecting-IP';
    const headers = {
      'CF-Connecting-IP': ip
    };
    const req: any = {
      header: headerName => headers[headerName]
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.ip).toBe(ip);
  });

  it('should create express context middleware with Client-IP', () => {
    const spy = sandbox.spy();
    const ip = 'Client-IP';
    const headers = {
      'Client-IP': ip
    };
    const req: any = {
      header: headerName => headers[headerName]
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.ip).toBe(ip);
  });

  it('should create express context middleware with x-real-ip', () => {
    const spy = sandbox.spy();
    const ip = 'x-real-ip';
    const headers = {
      'x-real-ip': ip
    };
    const req: any = {
      header: headerName => headers[headerName]
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.ip).toBe(ip);
  });

  it('should create express context middleware with req.ip', () => {
    const spy = sandbox.spy();
    const ip = 'ip';
    const req: any = {
      ip,
      header: () => undefined
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.ip).toBe(req.ip);
  });

  it('should create express context middleware with True-Client-IP', () => {
    const spy = sandbox.spy();
    const ip = 'True-Client-IP';
    const headers = {
      'True-Client-IP': ip
    };
    const req: any = {
      header: headerName => headers[headerName]
    };
    const middleware = ExpressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.ip).toBe(ip);
  });

  it('should create express context middleware with random correlationId', () => {
    const spy = sandbox.spy();
    const middlewareOptions = {
      generateCorrelationId: true
    };

    const req: any = {
      header: () => undefined
    };

    const middleware = ExpressLogContextMiddleware(middlewareOptions);
    middleware(req, {}, spy);

    expect(typeof req.logContext.correlationId).toBe('string');
  });
});
