import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

const mockPlayerService = {
  getPlayers: jest.fn(),
  fetchPlayer: jest.fn(),
  updatePlayer: jest.fn(),
  deletePlayer: jest.fn(),
};

describe('PlayerController', () => {
  let controller: PlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [{ provide: PlayerService, useValue: mockPlayerService }],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return players from the service', async () => {
    const expected = { data: [], meta: {} };
    mockPlayerService.getPlayers.mockResolvedValue(expected);

    expect(await controller.getPlayers({ page: 1, perPage: 25 })).toBe(
      expected,
    );
    expect(mockPlayerService.getPlayers).toHaveBeenCalledWith({
      page: 1,
      perPage: 25,
    });
  });

  it('should fetch a player by id', async () => {
    const expected = { data: { apiId: 1 } };
    mockPlayerService.fetchPlayer.mockResolvedValue(expected);

    expect(await controller.fetchPlayer(1, { page: 1, perPage: 25 })).toBe(
      expected,
    );
    expect(mockPlayerService.fetchPlayer).toHaveBeenCalledWith({
      id: 1,
      page: 1,
      perPage: 25,
    });
  });

  it('should update a player by id', async () => {
    const expected = { apiId: 1, firstName: 'Updated' };
    mockPlayerService.updatePlayer.mockResolvedValue(expected);

    expect(await controller.updatePlayer(1, { firstName: 'Updated' })).toBe(
      expected,
    );
    expect(mockPlayerService.updatePlayer).toHaveBeenCalledWith({
      apiId: 1,
      firstName: 'Updated',
    });
  });

  it('should delete a player by id', async () => {
    const expected = { message: 'Player deleted successfully' };
    mockPlayerService.deletePlayer.mockResolvedValue(expected);

    expect(await controller.deletePlayer(1)).toBe(expected);
    expect(mockPlayerService.deletePlayer).toHaveBeenCalledWith(1);
  });
});
