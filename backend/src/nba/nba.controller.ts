import { Controller, Get, Query } from '@nestjs/common';
import { NbaService } from './nba.service';
import { QueryDto } from 'src/dto/query.dto';
@Controller('nba')
export class NbaController {
  constructor(private readonly nbaService: NbaService) {}

  @Get('players')
  getPlayers(@Query() query: QueryDto) {
    return this.nbaService.getPlayers(query);
  }
}
