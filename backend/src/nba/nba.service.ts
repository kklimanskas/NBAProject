import { Injectable, Logger  } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { QueryDto } from 'src/dto/query.dto';
import { Player } from './schemas/player.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NbaService {
    private readonly logger = new Logger(NbaService.name);
  private readonly baseUrl = 'https://api.balldontlie.io/v1';
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {
  }

  async getPlayers(query: QueryDto) {
    try {
      this.logger.log('Fetching players');
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
            { apiId: player.id },         
            {
              apiId: player.id,
              firstName: player.first_name,
              lastName: player.last_name,
              position: player.position,
              teamName: player.team?.full_name,
            },
            { upsert: true, new: true } 
          )
        )
      );

       this.logger.log(`Players saved: ${data.data.length}`);
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch players', (error as Error).stack);
      throw error;
    }
    
  }
  
}
