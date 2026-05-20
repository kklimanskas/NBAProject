import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PlayerDto } from 'src/dto/player.dto';
import { Player } from '../schemas/player.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  PlayerModel,
  FetchPlayerResponse,
} from '../interfaces/player-api.interface';
import { Team } from 'src/schemas/team.schema';

@Injectable()
export class PlayerService {
  private readonly logger = new Logger(PlayerService.name);
  private readonly baseUrl = process.env.BASE_URL;
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Player.name) private playerModel: Model<Player>,
    @InjectModel(Team.name) private teamModel: Model<Team>,
  ) {}

  async fetchPlayers(
    query: PaginationDto,
  ): Promise<FetchPlayerResponse<PlayerModel>> {
    try {
      this.logger.log('Fetching players');
      const response = await firstValueFrom(
        this.httpService.get<FetchPlayerResponse<PlayerModel>>(
          `${this.baseUrl}/players`,
          {
            headers: { Authorization: this.apiKey },
            params: {
              page: query.page,
              per_page: query.perPage,
              search: query.search,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch players', (error as Error).stack);
      throw error;
    }
  }

  async populateDatabaseWithPlayers(
    query: PaginationDto,
  ): Promise<FetchPlayerResponse<PlayerModel>> {
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
              weight: player.weight,
              height: player.height,
              position: player.position,
              jerseyNumber: player.jersey_number,
              college: player.college,
              country: player.country,
              draftYear: player.draft_year,
              draftRound: player.draft_round,
              draftNumber: player.draft_number,
              team: player.team?.id,
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

  async getPlayers(query: PaginationDto) {
    try {
      this.logger.log('Fetching players from database');
      const players = await this.playerModel
        .find()
        .skip((query.page - 1) * query.perPage)
        .limit(query.perPage);

      const teams = await this.teamModel.find();

      const playersWithTeams = players.map((player) => {
        const team = teams.find((t) => t.apiId === player.team);
        return { ...player.toObject(), team };
      });

      const total = await this.playerModel.countDocuments({ isDeleted: false });

      return {
        data: playersWithTeams,
        meta: {
          total_count: total,
          current_page: query.page,
          per_page: query.perPage,
          total_pages: Math.ceil(total / query.perPage),
        },
      };
    } catch (error) {
      this.logger.error('Failed to get players', (error as Error).stack);
      throw error;
    }
  }
  async fetchPlayer(query: PaginationDto) {
    try {
      this.logger.log('Fetching player from database');

      const player = await this.playerModel.findOne({
        apiId: query.id,
        isDeleted: false,
      });

      if (!player) {
        this.logger.warn(`Player with apiId ${query.id} not found`);
        return null;
      }

      const team = await this.teamModel.findOne({
        apiId: player.team,
      });

      return {
        data: { ...player.toObject(), team },
      };
    } catch (error) {
      this.logger.error('Failed to get player', (error as Error).stack);
      throw error;
    }
  }
 

 async updatePlayer(playerDto: PlayerDto): Promise<Player> {
  try {
    this.logger.log(`Updating player ${playerDto.apiId}`);
    const player = await this.playerModel.findOneAndUpdate(
      { apiId: playerDto.apiId, isDeleted: false },
      { ...playerDto },
      { new: true },
    );

    if (!player) throw new NotFoundException(`Player ${playerDto.apiId} not found`);
    return player;
  } catch (error) {
    this.logger.error(`Failed to update player ${playerDto.apiId}`, (error as Error).stack);
    throw error;
  }
}

async deletePlayer(id: string): Promise<{ message: string }> {
  try {
    this.logger.log(`Soft deleting player ${id}`);
    const player = await this.playerModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true},
      { new: true },
    );

    if (!player) throw new NotFoundException(`Player ${id} not found`);
    return { message: 'Player deleted successfully' };
  } catch (error) {
    this.logger.error(`Failed to delete player ${id}`, (error as Error).stack);
    throw error;
  }
}
}
