import { Test, TestingModule } from '@nestjs/testing';
import { RewardRequestsService } from './reward-requests.service';
import { getModelToken } from '@nestjs/mongoose';
import { RewardRequest } from './schemas/reward-request.schema';
import { Reward } from '../rewards/schemas/reward.schema';
import { Types } from 'mongoose';

describe('RewardRequestsService 테스트', () => {
  let service: RewardRequestsService;

  const mockRequestModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockRewardModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([{ _id: 'reward1' }]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardRequestsService,
        {
          provide: getModelToken(RewardRequest.name),
          useValue: mockRequestModel,
        },
        {
          provide: getModelToken(Reward.name),
          useValue: mockRewardModel,
        },
      ],
    }).compile();

    service = module.get<RewardRequestsService>(RewardRequestsService);
  });

  it('서비스가 정의되어 있어야 함', () => {
    expect(service).toBeDefined();
  });
});
