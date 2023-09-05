import { LoggerMiddleware } from './logger-middleware.middleware';

describe('LoggerMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerMiddleware()).toBeDefined();
  });
});
