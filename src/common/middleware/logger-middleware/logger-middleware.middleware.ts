import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: () => void) {
    this.logger.log(this.createMessage(req));
    next();
  }

  private createMessage(req: Request): string {
    const msg = `API REQUEST: ${req.method} ${req.originalUrl} query=${req.query}`;
    return msg;
  }
}
