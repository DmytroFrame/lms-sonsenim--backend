import { ApiProperty } from '@nestjs/swagger';
import { Card } from '@prisma/client';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateCardDto implements Omit<Card, 'id' | 'createdAt' | 'updatedAt'> {
  @ApiProperty()
  @IsNumber()
  deckId: number;

  @ApiProperty()
  @IsString()
  primaryWord: string;

  @ApiProperty()
  @IsString()
  definition: string;

  @ApiProperty()
  @IsString()
  example: string;

  @ApiProperty()
  @IsDateString()
  nextRepetitionDate: Date;
}
