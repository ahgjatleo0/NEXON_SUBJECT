import { Test, TestingModule } from '@nestjs/testing';
import { RewardRequestsController } from './reward-requests.controller';
import { RewardRequestsService } from './reward-requests.service';

describe('RewardRequestsController', () => {
  let controller: RewardRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRequestsController],
      providers: [
        {
          provide: RewardRequestsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            updateStatus: jest.fn(),
            findByEvent: jest.fn(),
            findByUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RewardRequestsController>(RewardRequestsController);
  });

  it('컨트롤러가 정의되어 있어야 함', () => {
    expect(controller).toBeDefined();
  });
});
