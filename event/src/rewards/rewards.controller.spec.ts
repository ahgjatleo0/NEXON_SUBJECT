import { Test, TestingModule } from '@nestjs/testing';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';

describe('RewardsController', () => {
  let controller: RewardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardsController],
      providers: [
        {
          provide: RewardsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RewardsController>(RewardsController);
  });

  it('컨트롤러가 정의되어 있어야 함', () => {
    expect(controller).toBeDefined();
  });
});
