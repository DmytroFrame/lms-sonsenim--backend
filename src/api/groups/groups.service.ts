import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({ data: createGroupDto });
  }

  findAll(where?: Prisma.GroupWhereInput) {
    return this.prisma.group.findMany({ where, include: { _count: { select: { decks: true } } } });
  }

  findOne(id: number) {
    return this.prisma.group.findFirst({ where: { id } });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prisma.group.update({ where: { id }, data: updateGroupDto });
  }

  remove(id: number) {
    return this.prisma.group.delete({ where: { id } });
  }

  async stats(groupId: number) {
    const [decksTotal, cardsTotal] = await Promise.all([
      this.prisma.deck.count({ where: { groupId: groupId } }),
      this.prisma.card.count({ where: { deck: { groupId } } }),
    ]);

    return { decksTotal, cardsTotal };
  }
}
