import {ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus,} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class GlobalExceptionFilter
  implements ExceptionFilter {
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ) {
    // Get request/response objects
    const ctx = host.switchToHttp();
    const response =ctx.getResponse<Response>();
    const request =ctx.getRequest<Request>();

    // Default values
    let status =
      HttpStatus.INTERNAL_SERVER_ERROR;
    let message ="Internal Server Error";

    // Handle NestJS exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse =
        exception.getResponse();
      message =
        typeof errorResponse === "string"
          ? errorResponse
          : (errorResponse as any).message;
    }

    // Common JSON response
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp:new Date().toISOString(),
      path: request.url,
    });
  }
}