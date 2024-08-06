import { ApiProperty } from '@nestjs/swagger';
import { Deck } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeckDto implements Omit<Deck, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsNumber()
  groupId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFlashcardNormal: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFlashcardReversed: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isTyping: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRandomizedOrder: boolean;
}
