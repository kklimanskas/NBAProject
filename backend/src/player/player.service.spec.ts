import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Player } from '../schemas/player.schema';
import { Team } from '../schemas/team.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { of, throwError } from 'rxjs';

const mockPlayer = {
  _id: '507f1f77bcf86cd799439011',
  apiId: 1,
  firstName: 'LeBron',
  lastName: 'James',
  position: 'F',
  height: '6-9',
  weight: '250',
  jerseyNumber: '23',
  college: 'None',
  country: 'USA',
  draftYear: 2003,
  draftRound: 1,
  draftNumber: 1,
  team: 14,
  isDeleted: false,
  toObject: jest.fn().mockReturnValue({}),
};

const mockTeam = {
  _id: '507f1f77bcf86cd799439012',
  apiId: 14,
  name: 'Lakers',
  fullName: 'Los Angeles Lakers',
  abbreviation: 'LAL',
  city: 'Los Angeles',
  conference: 'West',
  division: 'Pacific',
  isDeleted: false,
};

const mockApiResponse = {
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
    meta: {
      total_pages: 1,
      current_page: 1,
      next_page: null,
      per_page: 25,
      total_count: 1,
    },
  },
};

describe('PlayerService', () => {
  let service: PlayerService;

  const mockPlayerModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    countDocuments: jest.fn(),
  };

  const mockTeamModel = {
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {});
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {});

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: getModelToken(Player.name), useValue: mockPlayerModel },
        { provide: getModelToken(Team.name), useValue: mockTeamModel },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchPlayers', () => {
    it('should fetch players from API', async () => {
      mockHttpService.get.mockReturnValue(of(mockApiResponse));

      const result = await service.fetchPlayers({ page: 1, perPage: 25 });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].first_name).toBe('LeBron');
    });

    it('should throw an error when API fails', async () => {
      mockHttpService.get.mockReturnValue(
        throwError(() => new Error('API Error')),
      );

      await expect(
        service.fetchPlayers({ page: 1, perPage: 25 }),
      ).rejects.toThrow('API Error');
    });
  });

  describe('populateDatabaseWithPlayers', () => {
    it('should save players to database', async () => {
      mockHttpService.get.mockReturnValue(of(mockApiResponse));
      mockPlayerModel.findOne.mockResolvedValue(null);
      mockPlayerModel.findOneAndUpdate.mockResolvedValue(mockPlayer);

      const result = await service.populateDatabaseWithPlayers({
        page: 1,
        perPage: 25,
      });

      expect(result.data).toHaveLength(1);
      expect(mockPlayerModel.findOneAndUpdate).toHaveBeenCalledWith(
        { apiId: 1 },
        {
          apiId: 1,
          firstName: 'LeBron',
          lastName: 'James',
          weight: '250',
          height: '6-9',
          position: 'F',
          jerseyNumber: '23',
          college: 'None',
          country: 'USA',
          draftYear: 2003,
          draftRound: 1,
          draftNumber: 1,
          team: 14,
        },
        { upsert: true, new: true },
      );
    });

    it('should not save players if already updated or deleted', async () => {
      mockHttpService.get.mockReturnValue(of(mockApiResponse));
      mockPlayerModel.findOne.mockResolvedValue({
        apiId: 1,
        updatedAtDate: new Date(),
      });

      await service.populateDatabaseWithPlayers({ page: 1, perPage: 25 });

      expect(mockPlayerModel.findOneAndUpdate).not.toHaveBeenCalled();
    });
  });

  describe('getPlayers', () => {
    it('should return players with team info', async () => {
      const limitMock = jest.fn().mockResolvedValue([mockPlayer]);
      const skipMock = jest.fn().mockReturnValue({ limit: limitMock });
      mockPlayerModel.find.mockReturnValue({ skip: skipMock });
      mockPlayerModel.countDocuments.mockResolvedValue(1);
      mockTeamModel.find.mockResolvedValue([mockTeam]);
      mockPlayer.toObject = jest.fn().mockReturnValue(mockPlayer);

      const result = await service.getPlayers({ page: 1, perPage: 25 });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].team).toEqual(mockTeam);
      expect(result.meta.total_count).toBe(1);
    });
  });

  describe('fetchPlayer', () => {
    it('should return player data with team', async () => {
      mockPlayerModel.findOne.mockResolvedValue(mockPlayer);
      mockTeamModel.findOne.mockResolvedValue(mockTeam);
      mockPlayer.toObject = jest.fn().mockReturnValue(mockPlayer);

      const result = await service.fetchPlayer({ id: 1, page: 1, perPage: 25 });

      expect(result).toEqual({ data: { ...mockPlayer, team: mockTeam } });
      expect(mockTeamModel.findOne).toHaveBeenCalledWith({
        apiId: mockPlayer.team,
      });
    });

    it('should return null when player not found', async () => {
      mockPlayerModel.findOne.mockResolvedValue(null);

      const result = await service.fetchPlayer({
        id: 999,
        page: 1,
        perPage: 25,
      });

      expect(result).toBeNull();
    });
  });

  describe('updatePlayer', () => {
    it('should update a player', async () => {
      const updatedPlayer = { ...mockPlayer, firstName: 'Updated' };
      mockPlayerModel.findOneAndUpdate.mockResolvedValue(updatedPlayer);

      const result = await service.updatePlayer({
        apiId: 1,
        firstName: 'Updated',
      });

      expect(result.firstName).toBe('Updated');
      expect(mockPlayerModel.findOneAndUpdate).toHaveBeenCalledWith(
        { apiId: 1, isDeleted: false },
        expect.objectContaining({ apiId: 1, firstName: 'Updated' }),
        { new: true },
      );
    });

    it('should throw NotFoundException if player not found', async () => {
      mockPlayerModel.findOneAndUpdate.mockResolvedValue(null);

      await expect(
        service.updatePlayer({ apiId: 1, firstName: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePlayer', () => {
    it('should soft delete a player', async () => {
      mockPlayerModel.findOneAndUpdate.mockResolvedValue({
        ...mockPlayer,
        isDeleted: true,
      });

      const result = await service.deletePlayer(1);

      expect(result).toEqual({ message: 'Player deleted successfully' });
      expect(mockPlayerModel.findOneAndUpdate).toHaveBeenCalledWith(
        { apiId: 1, isDeleted: false },
        { isDeleted: true },
        { new: true },
      );
    });

    it('should throw NotFoundException if player not found', async () => {
      mockPlayerModel.findOneAndUpdate.mockResolvedValue(null);

      await expect(service.deletePlayer(1)).rejects.toThrow(NotFoundException);
    });
  });
});
