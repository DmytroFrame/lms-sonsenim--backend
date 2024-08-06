import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('/add/:groupName')
  create(
    @Param('groupName') groupName: string,
    @Body() payload: UpdateGroupDto,
    @User('id') id: number,
  ) {
    return this.groupsService.create({
      userId: id,
      name: groupName,
      icon: payload.icon ?? '',
      description: payload.description ?? '',
    });
  }

  @Get()
  async findAll(@User('id') id: number) {
    const groups = await this.groupsService.findAll({ userId: id });
    return groups.map(({ name, id }) => ({ id, groupName: name }));
  }

  @Get('/user-groups-info')
  async userGroupsInfo(@User('id') id: number) {
    const groups = await this.groupsService.findAll({ userId: id });
    return groups.map((group) => ({
      groupId: group.id,
      groupName: group.name,
      decksCount: group._count.decks,
    }));
  }

  @Get('/stats/:groupId')
  stats(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupsService.stats(groupId);
  }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateGroupDto: UpdateGroupDto) {
  //   return this.groupsService.update(id, updateGroupDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.groupsService.remove(id);
  // }
}
