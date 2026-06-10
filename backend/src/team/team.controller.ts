import { Controller, Get, Patch, Delete, Query, Param, Body } from '@nestjs/common';
import { TeamService } from './team.service'
import { PaginationDto } from 'src/dto/pagination.dto';
import { Team } from '../schemas/team.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiExtraModels } from '@nestjs/swagger';

@ApiTags('Teams')
@ApiExtraModels(Team)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('fetch-teams')
    @ApiOperation({ summary: 'List teams with pagination and filters' })
    @ApiResponse({ status: 200, description: 'List of teams' })

  fetchTeams(@Query() query: PaginationDto) {
    return this.teamService.fetchTeams(query);
  }

  @Patch('populate')
  @ApiOperation({ summary: 'Populate database with teams' })
  @ApiResponse({ status: 200, description: 'Database populated with teams' })
  populateTeams(@Query() query: PaginationDto) {
    return this.teamService.populateDatabaseWithTeams(query);
  }


}