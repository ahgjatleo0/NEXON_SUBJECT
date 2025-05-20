import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

describe('UserController 테스트', () => {
  let controller: UserController;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const userServiceMock = {
      create: jest.fn(),
      validateUser: jest.fn(),
    };

    const jwtServiceMock = {
      signAsync: jest.fn().mockResolvedValue('mock_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('컨트롤러가 정의되어 있어야 함', () => {
    expect(controller).toBeDefined();
  });

  it('register(): 유저 등록이 정상 작동해야 함', async () => {
    const dto = { email: 'user@example.com', password: '1234', nickname: '테스트' };
    const mockUser = { ...dto, role: 'USER' };

    jest.spyOn(userService, 'create').mockResolvedValue(mockUser as any);

    const result = await controller.register(dto);
    expect(result).toEqual(mockUser);
  });

  it('login(): access_token이 발급되어야 함', async () => {
    const dto = { email: 'user@example.com', password: '1234' };
    const user = { email: 'user@example.com', role: 'USER' };

    jest.spyOn(userService, 'validateUser').mockResolvedValue(user as any);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mock_token');

    const result = await controller.login(dto);
    expect(result).toEqual({ access_token: 'mock_token' });
  });
});
