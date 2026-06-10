import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PlayerDto } from 'src/dto/player.dto';

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
  @Get(':id')
  fetchPlayer(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    query.id = id;
    return this.playerService.fetchPlayer(query);
  }
  @Patch('update/:id')
  updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() playerData: PlayerDto,
  ) {
    playerData.apiId = id;
    return this.playerService.updatePlayer(playerData);
  }
}
