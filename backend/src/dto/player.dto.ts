import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Position } from 'src/enums/index.enum';

export class PlayerDto {
  @IsOptional()
  @IsNumber()
  apiId?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  position?: Position;

  @IsOptional()
  @IsString()
  height?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  jerseyNumber?: string;

  @IsOptional()
  @IsString()
  college?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  draftYear?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  draftRound?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  draftNumber?: number;
}
