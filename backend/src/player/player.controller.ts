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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';
import { Player } from 'src/schemas/player.schema';

import { PlayerJob } from '../cronjobs/player.job';
@ApiTags('Player')
@ApiExtraModels(Player)
@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    //   private readonly playerJob: PlayerJob
  ) {}
  // @Get('sync')
  // syncPlayers() {
  //   return this.playerJob.syncPlayers();
  // }

  // @Get('players-from-api')
  // @ApiOperation({ summary: 'List players with pagination and filters' })
  // @ApiResponse({ status: 200, description: 'List of players' })
  // fetchPlayers(@Query() query: PaginationDto) {
  //   return this.playerService.fetchPlayers(query);
  // }

  // @Get('fill-database')
  // @ApiOperation({ summary: 'Populate database with players' })
  // @ApiResponse({ status: 200, description: 'Database populated with players' })
  // populateDatabaseWithPlayers(@Query() query: PaginationDto) {
  //   return this.playerService.populateDatabaseWithPlayers(query);
  // }

  @Get('get')
  @ApiOperation({ summary: 'Get players with pagination and filters' })
  @ApiResponse({ status: 200, description: 'List of players' })
  getPlayers(@Query() query: PaginationDto) {
    return this.playerService.getPlayers(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a player by ID' })
  @ApiResponse({ status: 200, description: 'Player details' })
  fetchPlayer(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: PaginationDto,
  ) {
    query.id = id;
    return this.playerService.fetchPlayer(query);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a player by ID' })
  @ApiResponse({ status: 200, description: 'Updated player details' })
  updatePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() playerData: PlayerDto,
  ) {
    playerData.apiId = id;
    return this.playerService.updatePlayer(playerData);
  }

  @Patch('delete/:id')
  @ApiOperation({ summary: 'Soft delete a player by ID' })
  @ApiResponse({ status: 200, description: 'Player soft deleted successfully' })
  deletePlayer(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.deletePlayer(id);
  }
}
