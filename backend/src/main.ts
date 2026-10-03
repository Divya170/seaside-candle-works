import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const origins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins, allowedHeaders: ['Content-Type', 'x-admin-token'] });
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  Logger.log(`Seaside Candle Works API listening on http://localhost:${port}/api`, 'Bootstrap');
}
bootstrap();
