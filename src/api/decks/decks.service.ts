import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class DecksService {
  constructor(private prisma: PrismaService) {}

  create(createDeckDto: CreateDeckDto) {
    return this.prisma.deck.create({ data: createDeckDto });
  }

  findAll() {
    return this.prisma.deck.findMany();
  }

  findOne(id: number) {
    return this.prisma.deck.findFirst({ where: { id } });
  }

  update(id: number, updateDeckDto: UpdateDeckDto) {
    return this.prisma.deck.update({ where: { id }, data: updateDeckDto });
  }

  remove(id: number) {
    return this.prisma.deck.delete({ where: { id } });
  }
}
