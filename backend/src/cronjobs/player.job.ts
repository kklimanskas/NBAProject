import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PlayerService } from '../player/player.service';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class PlayerJob {
  private readonly logger = new Logger(PlayerJob.name);

  constructor(private readonly playerService: PlayerService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncPlayers() {
    try {
      const query: PaginationDto = { page: 1, perPage: 100 };
      const response =
        await this.playerService.populateDatabaseWithPlayers(query);
      this.logger.log(
        `Player sync completed: ${response.data.length} players updated/added.`,
      );
    } catch (error) {
      this.logger.error('Player sync failed', (error as Error).stack);
    }
  }
}
