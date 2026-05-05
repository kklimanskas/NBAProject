import { Controller, Get, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { QueryDto } from 'src/dto/query.dto';
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('players')
  getPlayers(@Query() query: QueryDto) {
    return this.playerService.getPlayers(query);
  }
}
