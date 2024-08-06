import { ApiProperty } from '@nestjs/swagger';
import { Group } from '@prisma/client';
import { IsBase64, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto implements Omit<Group, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsBase64()
  icon: string;
}
