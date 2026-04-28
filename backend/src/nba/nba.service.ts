import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppLogger } from '../logger/logger.service';
import { QueryDto } from 'src/dto/query.dto';
import { Player } from './schemas/player.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NbaService {
  private readonly baseUrl = 'https://api.balldontlie.io/v1';
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly httpService: HttpService,
    private readonly logger: AppLogger,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {
    this.logger.setContext(NbaService.name);
  }

  async getPlayers(query: QueryDto) {
    try {
      this.logger.info('Fetching players', { query });
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/players`, {
          headers: { Authorization: this.apiKey },
          params: {
            page: query.page,
            per_page: query.perPage,
            search: query.search,
          },
        }),
      );
        await Promise.all(
        data.data.map((player: any) =>
          this.playerModel.findOneAndUpdate(
            { apiId: player.id },         // find by apiId
            {
              apiId: player.id,
              firstName: player.first_name,
              lastName: player.last_name,
              position: player.position,
              teamName: player.team?.full_name,
            },
            { upsert: true, new: true }   // create if not exists
          )
        )
      );

      this.logger.info('Players saved', { count: data.data.length });
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch players', (error as Error).stack);
      throw error;
    }
    
  }
  
}
