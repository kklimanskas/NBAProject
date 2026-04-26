import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NbaController } from './nba.controller';
import { NbaService } from './nba.service';

@Module({
  imports: [HttpModule],
  controllers: [NbaController],
  providers: [NbaService],
})
export class NbaModule {}