import { Controller, Get, Patch, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PaginationDto } from 'src/dto/pagination.dto';
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('players-from-api')
  fetchPlayers(@Query() query: PaginationDto) {
    return this.playerService.fetchPlayers(query);
  }
  @Get('fill-database')
  populateDatabaseWithPlayers(@Query() query: PaginationDto) {
    return this.playerService.populateDatabaseWithPlayers(query);
  }
  @Get('get')
  getPlayers(@Query() query: PaginationDto) {
    return this.playerService.getPlayers(query);
  }
}
