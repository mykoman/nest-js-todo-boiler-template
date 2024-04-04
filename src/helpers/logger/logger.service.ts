import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import * as path from 'path';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'error',
      format: format.json(),
      transports: [
        new transports.File({
          filename: './logs/all-logs.log',
          level: 'error',
          maxsize: 5242880,
          maxFiles: 5,
        }),
        new transports.Console(),
      ],
    });
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }
}
