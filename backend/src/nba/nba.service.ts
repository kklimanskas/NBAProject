import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AppLogger } from '../logger/logger.service';

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

  async getPlayers() {
    try {
      this.logger.log('Fetching players');
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/players`, {
          headers: { Authorization: this.apiKey },
        }),
      );
      return data;
    } catch (error) {
      this.logger.error('Failed to fetch players', (error as Error).stack);
      throw error;
    }
  }
}
