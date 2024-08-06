import { Catch, ExceptionFilter, ArgumentsHost, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.code === 'P2002' ? 409 : 500; // Conflict for unique constraint violation
    const customResponse = {
      status,
      message: exception.message,
    };
    response.status(customResponse.status).json(customResponse);
  }
}

export const PrismaClientExceptionFilterProvider: Provider = {
  provide: APP_FILTER,
  useClass: PrismaClientExceptionFilter,
};
