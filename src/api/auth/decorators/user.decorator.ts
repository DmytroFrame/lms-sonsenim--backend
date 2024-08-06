import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import Prisma from '@prisma/client';
import { IExpressRequest } from '../interfaces/express-request.interface';

export const User = createParamDecorator((data: keyof Prisma.User, ctx: ExecutionContext) => {
  const req: IExpressRequest = ctx.switchToHttp().getRequest();

  if (!req.user) {
    throw new UnauthorizedException('Not authorized');
  }

  return data ? req.user[data] : req.user;
});
