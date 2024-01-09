import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 捕获所有异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const responseStatus =
      exception instanceof HttpException
        ? 200
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'internet server error';

    new Logger('HttpExceptionFilter').error(
      request.url,
      exception.message,
      exception.stack,
    );
    response.status(responseStatus).json({
      code: status,
      message,
    });
  }
}
