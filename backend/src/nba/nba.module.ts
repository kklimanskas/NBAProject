import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { NbaController } from './nba.controller';
import { NbaService } from './nba.service';
import { Player, PlayerSchema } from './schemas/player.schema';

@Module({
   imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
  ],
  controllers: [NbaController],
  providers: [NbaService],
})
export class NbaModule {}