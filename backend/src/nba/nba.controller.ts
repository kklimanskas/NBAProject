import { Controller, Get } from '@nestjs/common';
import { NbaService } from './nba.service';

@Controller('nba')
export class NbaController {
  constructor(private readonly nbaService: NbaService) {}

  @Get('players')
  getPlayers() {
    return this.nbaService.getPlayers();
  }

}