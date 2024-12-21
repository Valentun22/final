import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DbQueryFailedFilter } from './db-query-failed.filter';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: LoggerService;

  constructor(logger: LoggerService = new Logger()) {
    this.logger = logger;
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let messages: string | string[];
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = (exception.getResponse() as any).message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = exception.message;
    } else if (exception instanceof QueryFailedError) {
      const error = DbQueryFailedFilter.filter(exception);
      status = error.status;
      messages = error.message;
    } else {
      status = 500;
      messages = 'Internal server error';
    }
    this.logger.error(exception);

    messages = Array.isArray(messages) ? messages : [messages];
    Logger.error(
      messages.join(', '),
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );

    response.status(status).json({
      statusCode: status,
      messages,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
