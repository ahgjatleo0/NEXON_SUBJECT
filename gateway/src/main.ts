import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express(); // ✅ express 서버 직접 생성
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const isDocker = process.env.NODE_ENV === 'docker';

  const targetAuth = isDocker ? 'http://auth_service:3001' : 'http://localhost:3001';
  const targetEvent = isDocker ? 'http://event_service:3002' : 'http://localhost:3002';

  // 이벤트 경로 프록시
  server.use(
    '/events',
    createProxyMiddleware({
      target: targetEvent,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        console.log('[Gateway] 요청 경로:', path);  // 로그로 경로 확인
        return path.replace('^/events', '');  // 경로 리팩토링
      },
    }),
  );

  // 인증 경로 프록시
  server.use(
    '/auth',
    createProxyMiddleware({
      target: targetAuth,
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
    }),
  );

  // 보상 경로 프록시
  server.use(
    '/rewards',
    createProxyMiddleware({
      target: targetEvent,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        console.log('[Gateway] 요청 경로:', path);
        return path.replace('^/rewards', '');  // 경로 리팩토링
      },
    }),
  );

  // 보상 요청 경로 프록시
  server.use(
    '/reward-requests',
    createProxyMiddleware({
      target: targetEvent,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        console.log('[Gateway] 요청 경로:', path);
        return path.replace('^/reward-requests', '');  // 경로 리팩토링
      },
    }),
  );

  await app.init();
  await app.listen(3000, () => {
    console.log('✅ Gateway running on http://localhost:3000');
  });
}
bootstrap();
