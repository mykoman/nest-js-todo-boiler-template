import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Catch()
export class LoggerFilter<T> implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message || 'Internal server error';

    this.logger.error(
      `HTTP Error: ${status} - ${message}`,
      JSON.stringify({
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        error: exception.stack,
      }),
    );

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
