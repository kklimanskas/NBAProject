import { Controller, Get, Patch, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PaginationDto } from 'src/dto/pagination.dto';
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('players-from-api')
  getPlayers(@Query() query: PaginationDto) {
    return this.playerService.fetchPlayers(query);
  }
  @Patch('fill-database')
  populateDatabaseWithPlayers(@Query() query: PaginationDto) {
    return this.playerService.populateDatabaseWithPlayers(query);
  }
}
