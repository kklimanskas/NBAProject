import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NbaService {
  private readonly baseUrl = 'https://api.balldontlie.io/v1';
  private readonly apiKey = process.env.API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getPlayers() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/players`, {
        headers: { Authorization: this.apiKey },
      })
    );
    return data;
  }

}