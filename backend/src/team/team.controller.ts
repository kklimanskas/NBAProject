import { Controller, Get, Patch, Delete, Query, Param, Body } from '@nestjs/common';
import { TeamService } from './team.service'
import { PaginationDto } from 'src/dto/pagination.dto';
import { Team } from '../schemas/team.schema';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('fetch-teams')
  fetchTeams(@Query() query: PaginationDto) {
    return this.teamService.fetchTeams(query);
  }

  @Get('populate')
  populateTeams(@Query() query: PaginationDto) {
    return this.teamService.populateDatabaseWithTeams(query);
  }


}