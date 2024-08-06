import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IExpressRequest } from './interfaces/express-request.interface';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async use(req: IExpressRequest, _res: Response, next: NextFunction) {
    req.user = null;

    if (!req.headers.authorization) {
      return next();
    }

    try {
      const accessToken = req.headers.authorization.split(' ').pop();
      const { id } = await this.authService.verifyAccessToken(accessToken);
      const user = await this.usersService.findOne({ id });

      req.user = user;
    } catch (_) {}

    next();
  }
}
