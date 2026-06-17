import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from '../schemas/team.schema';
import { TeamModel, FetchTeamResponse } from '../interfaces/team-api.interface';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);
  private readonly baseUrl = process.env.BASE_URL;
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Team.name) private teamModel: Model<Team>,
  ) {}

  async fetchTeams(
    query: PaginationDto,
  ): Promise<FetchTeamResponse<TeamModel>> {
    try {
      this.logger.log('Fetching teams');
      const response = await firstValueFrom(
        this.httpService.get<FetchTeamResponse<TeamModel>>(
          `${this.baseUrl}/teams`,
          {
            headers: { Authorization: this.apiKey },
            params: {
              page: query.page,
              per_page: query.perPage,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch teams', (error as Error).stack);
      throw error;
    }
  }

  async populateDatabaseWithTeams(
    query: PaginationDto,
  ): Promise<FetchTeamResponse<TeamModel>> {
    try {
      const response = await this.fetchTeams(query);

      await Promise.all(
        response.data.map((team: TeamModel) =>
          this.teamModel.findOneAndUpdate(
            { apiId: team.apiId },
            {
              apiId: team.apiId,
              name: team.name,
              fullName: team.full_name,
              abbreviation: team.abbreviation,
              city: team.city,
              conference: team.conference,
              division: team.division,
            },
            { upsert: true, new: true },
          ),
        ),
      );

      this.logger.log(`Teams saved: ${response.data.length}`);
      return response;
    } catch (error) {
      this.logger.error('Failed to populate teams', (error as Error).stack);
      throw error;
    }
  }
}
