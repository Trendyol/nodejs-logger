import { expressLogContextMiddleware } from '../../src/middlewares/express-log-context-middleware';
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
      header: sandbox.stub().returnsArg(0)
    };
    const middleware = expressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(spy.calledOnce).toBe(true);
    expect(req.logContext).toBeDefined();
    expect(req.logContext.currentUrl).toBe(req.originalUrl);
    expect(req.logContext.userAgent).toBe('user-agent');
    expect(req.logContext.refererUrl).toBe('referer');
    expect(req.logContext.correlationId).toBe('x-correlation-id');
  });

  it('should create express context middleware with x-user-agent', () => {
    const spy = sandbox.spy();
    const userAgent = 'x-user-agent';

    const headers = {
      'x-user-agent': userAgent
    };

    const req: any = {
      header: headerName => headers[headerName]
    };
    const middleware = expressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.userAgent).toBe(userAgent);
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
    const middleware = expressLogContextMiddleware();
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
    const middleware = expressLogContextMiddleware();
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
    const middleware = expressLogContextMiddleware();
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
    const middleware = expressLogContextMiddleware();
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
    const middleware = expressLogContextMiddleware();
    middleware(req, {}, spy);

    expect(req.logContext.ip).toBe(req.ip);
  });

  it('should create express context middleware with random correlationId', () => {
    const spy = sandbox.spy();
    const middlewareOptions = {
      generateCorrelationId: true
    };

    const req: any = {
      header: () => undefined
    };

    const middleware = expressLogContextMiddleware(middlewareOptions);
    middleware(req, {}, spy);

    expect(typeof req.logContext.correlationId).toBe('string');
  });
});
