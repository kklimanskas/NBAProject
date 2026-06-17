import { IsOptional, IsInt, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @ApiProperty({ description: 'The page number for pagination', default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @ApiProperty({ description: 'The ID of the player to filter by' })
  @Type(() => Number)
  @IsInt()
  @Max(100)
  id?: number;

  @IsOptional()
  @ApiProperty({
    description: 'The number of items per page for pagination',
    default: 25,
  })
  @Type(() => Number)
  @IsInt()
  @Max(100)
  perPage: number = 25;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The search term for filtering players' })
  search?: string;
}
