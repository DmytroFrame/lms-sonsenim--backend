import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() payload: RegisterAuthDto) {
    return this.authService.register(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }
}
