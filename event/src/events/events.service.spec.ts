import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const mockEventSave = jest.fn().mockResolvedValue({
      _id: 'event1',
      title: '출석이벤트',
    });

    const mockEventModel = jest.fn().mockImplementation(() => ({
      save: mockEventSave,
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event.name),
          useValue: Object.assign(mockEventModel, {
            find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([]) }),
          }),
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('서비스가 정의되어 있어야 함', () => {
    expect(service).toBeDefined();
  });

  it('이벤트 등록이 정상적으로 작동해야 함', async () => {
    const result = await service.create({ title: '출석이벤트' });
    expect(result.title).toBe('출석이벤트');
  });
});
