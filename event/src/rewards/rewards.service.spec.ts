import { Test, TestingModule } from '@nestjs/testing';
import { RewardsService } from './rewards.service';
import { getModelToken } from '@nestjs/mongoose';
import { Reward } from './schemas/reward.schema';

describe('RewardsService', () => {
  let service: RewardsService;

  const mockRewardModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnValue({ populate: jest.fn().mockReturnValue({ exec: jest.fn() }) }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardsService,
        {
          provide: getModelToken(Reward.name),
          useValue: mockRewardModel,
        },
      ],
    }).compile();

    service = module.get<RewardsService>(RewardsService);
  });

  it('서비스가 정의되어 있어야 함', () => {
    expect(service).toBeDefined();
  });
});
