import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('UserService 테스트', () => {
  let service: UserService;
  let mockUserModel: any;

  beforeEach(async () => {
    mockUserModel = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create()', () => {
    it('이미 등록된 이메일일 경우 예외를 던져야 함', async () => {
      mockUserModel.findOne.mockResolvedValue({ email: 'test@example.com' });

      await expect(
        service.create({
          email: 'test@example.com',
          password: '1234',
          nickname: '테스트닉',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('새 유저를 비밀번호 해시와 함께 생성해야 함', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      const mockSave = jest.fn().mockResolvedValue({
        email: 'test@example.com',
        password: 'hashed_pw',
        nickname: '테스트닉',
        role: 'USER',
      });

      const userModelStub = jest.fn().mockImplementation(() => ({
        save: mockSave,
      }));

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getModelToken(User.name),
            useValue: Object.assign(userModelStub, {
              findOne: mockUserModel.findOne,
            }),
          },
          UserService,
        ],
      }).compile();

      const service = module.get<UserService>(UserService);

      const result = await service.create({
        email: 'test@example.com',
        password: '1234',
        nickname: '테스트닉',
      });

      expect(result.email).toBe('test@example.com');
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe('validateUser()', () => {
    it('이메일/비밀번호가 맞을 경우 유저를 반환해야 함', async () => {
      const hashed = await bcrypt.hash('1234', 10);
      mockUserModel.findOne.mockResolvedValue({
        email: 'test@example.com',
        password: hashed,
        role: 'USER',
      });

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getModelToken(User.name),
            useValue: mockUserModel,
          },
          UserService,
        ],
      }).compile();

      const service = module.get<UserService>(UserService);
      const user = await service.validateUser('test@example.com', '1234');

      expect(user.email).toBe('test@example.com');
    });

    it('해당 이메일이 없을 경우 예외 발생', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: getModelToken(User.name),
            useValue: mockUserModel,
          },
          UserService,
        ],
      }).compile();

      const service = module.get<UserService>(UserService);

      await expect(service.validateUser('fail@example.com', '1234')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
