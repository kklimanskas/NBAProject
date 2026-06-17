import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { Player, PlayerSchema } from '../schemas/player.schema';
import { Team, TeamSchema } from '../schemas/team.schema';
import { PlayerJob } from '../cronjobs/player.job';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Player.name, schema: PlayerSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
  ],
  controllers: [PlayerController],
  providers: [PlayerService, PlayerJob],
})
export class PlayerModule {}
