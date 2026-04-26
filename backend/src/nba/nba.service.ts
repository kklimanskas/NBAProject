import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppLogger } from '../logger/logger.service';
import { QueryDto } from 'src/dto/query.dto';
@Injectable()
export class NbaService {
  private readonly baseUrl = 'https://api.balldontlie.io/v1';
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private readonly httpService: HttpService,
    private readonly logger: AppLogger,
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
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch players', (error as Error).stack);
      throw error;
    }
  }
}
