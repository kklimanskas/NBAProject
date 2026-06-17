import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Position } from 'src/enums/index.enum';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The API ID of the player' })
  apiId?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The first name of the player' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The last name of the player' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The position of the player', enum: Position })
  position?: Position;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The height of the player' })
  height?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The weight of the player' })
  weight?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The jersey number of the player' })
  jerseyNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The college of the player' })
  college?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The country of the player' })
  country?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'The draft year of the player' })
  draftYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'The draft round of the player' })
  draftRound?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ description: 'The draft number of the player' })
  draftNumber?: number;
}
