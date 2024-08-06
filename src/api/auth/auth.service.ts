import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(payload: RegisterAuthDto) {
    const countOfUserMatches = await this.usersService.count({
      OR: [{ username: { contains: payload.username } }, { email: { contains: payload.email } }],
    });

    if (countOfUserMatches) {
      throw new ConflictException('A user with such data already exists');
    }

    payload.password = await this.hashPassword(payload.password);
    const newUser = await this.usersService.create(payload);

    return { token: await this.genJwtToken(newUser) };
  }

  async login(payload: LoginAuthDto) {
    const userFromDB = await this.usersService.findOne({ username: payload.username });
    const isPasswordMatch = await bcrypt.compare(payload.password, userFromDB?.password);

    if (!userFromDB || !isPasswordMatch) {
      throw new ConflictException('The data is not correct');
    }

    return { token: await this.genJwtToken(userFromDB) };
  }

  async verifyAccessToken(accessToken: string): Promise<Pick<User, 'id' | 'email' | 'username'>> {
    return this.jwtService.verifyAsync(accessToken);
  }

  private hashPassword(value: string) {
    return bcrypt.hash(value, 10);
  }

  private genJwtToken(user: User) {
    return this.jwtService.signAsync({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }
}
