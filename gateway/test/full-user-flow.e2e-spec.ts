import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('📦 전체 사용자 흐름 테스트', () => {
  const baseURL = 'http://gateway_service:3000';  // Docker에서 실행되는 Gateway 컨테이너로 요청 보냄
  let userToken: string;
  let adminToken: string;
  let eventId: string;
  let rewardId: string;
  let requestId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();
    await app.init();
  });

  it('1. 회원가입 (USER)', async () => {
    const res = await request(baseURL)
      .post('/auth/user/register')
      .send({
        email: 'user1@example.com',
        password: '1234',
        nickname: '유저1',
      });
    expect(res.status).toBe(201);
  });

  it('2. 로그인 (USER)', async () => {
    const res = await request(baseURL)
      .post('/auth/user/login')
      .send({ email: 'user1@example.com', password: '1234' });
    expect(res.status).toBe(201);
    userToken = res.body.access_token;
  });

  it('3. 로그인 (ADMIN)', async () => {
    const res = await request(baseURL)
      .post('/auth/user/login')
      .send({ email: 'test@example.com', password: '1234' });
    expect(res.status).toBe(201);
    adminToken = res.body.access_token;
  });

  it('4. 이벤트 등록', async () => {
    const res = await request(baseURL)
      .post('/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: '출석 이벤트',
        description: '매일 1000포인트',
        startAt: new Date(),
        endAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        isActive: true,
      });
    expect(res.status).toBe(201);
    eventId = res.body._id;
  });

  it('5. 보상 등록', async () => {
    const res = await request(baseURL)
      .post('/rewards')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        type: '포인트',
        amount: 1000,
        description: '출석 보상',
        eventId,
      });
    expect(res.status).toBe(201);
    rewardId = res.body._id;
  });

  it('6. 보상 요청 생성', async () => {
    const res = await request(baseURL)
      .post('/reward-requests')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ rewardId });
    expect(res.status).toBe(201);
    requestId = res.body._id;
  });

  it('7. 보상 요청 승인 (ADMIN)', async () => {
    const res = await request(baseURL)
      .patch(`/reward-requests/${requestId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'APPROVED' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('APPROVED');
  });

  afterAll(async () => {
    // e2e 테스트 종료 후 실행
  });
});
