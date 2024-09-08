import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';

    const startTimestamp = process.hrtime();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const endTimestamp = process.hrtime(startTimestamp);
      const durationInMilliseconds = endTimestamp[0] * 1000 + endTimestamp[1] / 1e6;

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${durationInMilliseconds}ms`,
      );
    });

    next();
  }
}
