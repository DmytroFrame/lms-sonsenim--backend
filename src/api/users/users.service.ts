import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly users = this.prisma.user;

  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.users.create({ data: createUserDto });
  }

  findAll(where?: Prisma.UserWhereInput) {
    return this.users.findMany({ where });
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.users.findUnique({ where });
  }

  count(where?: Prisma.UserWhereInput) {
    return this.users.count({ where });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.users.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.users.delete({ where: { id } });
  }
}
