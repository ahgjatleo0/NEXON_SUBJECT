import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express(); // ✅ express 서버 직접 생성
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  server.use(
    '/events',
    createProxyMiddleware({
      target: 'http://event_service:3002',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        console.log('[Gateway] 요청 경로:', path);
        return '/events'; 
      },
    }),
  );

  server.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://auth_service:3001',
      changeOrigin: true,
      pathRewrite: { '^/auth': '' },
    }),
  );

  server.use(
    '/rewards',
    createProxyMiddleware({
      target: 'http://event_service:3002',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        console.log('[Gateway] 요청 경로:', path);
        return '/rewards'; 
      },
    }),
  );

  server.use(
    '/reward-requests',
    createProxyMiddleware({
      target: 'http://event_service:3002',
      changeOrigin: true,
      pathRewrite: (path, req) => {
        console.log('[Gateway] 요청 경로:', path);
        return '/reward-requests'; 
      },
    }),
  );

  await app.init(); // ✅ 먼저 Nest 앱 초기화
  server.listen(3000, () => {
    console.log('✅ Gateway running on http://localhost:3000');
  });
}
bootstrap();
