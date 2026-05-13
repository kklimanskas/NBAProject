import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/dto/pagination.dto';
import { Player } from '../schemas/player.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PlayerModel, FetchPlayerResponse } from '../interfaces/player-api.interface';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);
  private readonly baseUrl = process.env.BASE_URL;
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {}

  async fetchPlayers(query: PaginationDto): Promise<FetchPlayerResponse<PlayerModel>> {
    try {
      this.logger.log('Fetching players');
      const response = await firstValueFrom(
        this.httpService.get<FetchPlayerResponse<PlayerModel>>(`${this.baseUrl}/players`, {
          headers: { Authorization: this.apiKey },
          params: {
            page: query.page,
            per_page: query.perPage,
            search: query.search,
          },
        }),
      );
      return response.data; 
    } catch (error) {
      this.logger.error('Failed to fetch players', (error as Error).stack);
      throw error;
    }
  }

  async populateDatabaseWithPlayers(query: PaginationDto): Promise<FetchPlayerResponse<PlayerModel>> {
    try {
      const response = await this.fetchPlayers(query);

      await Promise.all(
        response.data.map((player: PlayerModel) =>
          this.playerModel.findOneAndUpdate(
            { apiId: player.id },
            {
              apiId: player.id,
              firstName: player.first_name,
              lastName: player.last_name,
              position: player.position,
              jerseyNumber: player.jersey_number,
              college: player.college,
              country: player.country,
              draftYear: player.draft_year,
              draftRound: player.draft_round,
              draftNumber: player.draft_number,
              team: {
                id: player.team?.id,
                name: player.team?.name,
                fullName: player.team?.full_name,
                abbreviation: player.team?.abbreviation,
                city: player.team?.city,
                conference: player.team?.conference,
                division: player.team?.division,
              },
            },
            { upsert: true, new: true },
          ),
        ),
      );

      this.logger.log(`Players saved: ${response.data.length}`);
      return response;
    } catch (error) {
      this.logger.error('Failed to populate players', (error as Error).stack);
      throw error;
    }
  }
}