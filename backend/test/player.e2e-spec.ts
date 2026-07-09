import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { PlayerService } from '../src/player/player.service';
import { Player } from '../src/schemas/player.schema';
import { Team } from '../src/schemas/team.schema';
import { of } from 'rxjs';

const mockNbaApiResponse = {
  data: {
    data: [
      {
        id: 1,
        first_name: 'LeBron',
        last_name: 'James',
        position: 'F',
        height: '6-9',
        weight: '250',
        jersey_number: '23',
        college: 'None',
        country: 'USA',
        draft_year: 2003,
        draft_round: 1,
        draft_number: 1,
        team: { id: 14 },
      },
    ],
    meta: { total_pages: 1, current_page: 1, per_page: 25, total_count: 1 },
  },
};

describe('Player E2E - NBA API Integration (mocked)', () => {
  let app: INestApplication;
  let service: PlayerService;

  const mockHttpService = { get: jest.fn() };
  const mockPlayerModel = { findOne: jest.fn(), findOneAndUpdate: jest.fn() };
  const mockTeamModel = {};

  beforeEach(async () => {
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: getModelToken(Player.name), useValue: mockPlayerModel },
        { provide: getModelToken(Team.name), useValue: mockTeamModel },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = module.get<PlayerService>(PlayerService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('should fetch players from mocked NBA API and save to database', async () => {
    mockHttpService.get.mockReturnValue(of(mockNbaApiResponse));
    mockPlayerModel.findOne.mockResolvedValue(null);
    mockPlayerModel.findOneAndUpdate.mockResolvedValue({
      apiId: 1,
      firstName: 'LeBron',
    });

    const result = await service.populateDatabaseWithPlayers({
      page: 1,
      perPage: 25,
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].first_name).toBe('LeBron');
    expect(mockPlayerModel.findOneAndUpdate).toHaveBeenCalledWith(
      { apiId: 1 },
      expect.objectContaining({
        firstName: 'LeBron',
        lastName: 'James',
        team: 14,
      }),
      { upsert: true, new: true },
    );
  });
});
