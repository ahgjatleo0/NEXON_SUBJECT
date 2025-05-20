import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('컨트롤러가 정의되어 있어야 함', () => {
    expect(controller).toBeDefined();
  });
});
