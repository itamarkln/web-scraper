import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Express from 'express';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('v1/api');
  app.use(Express.static(join(__dirname, 'public')));

  await app.listen(4000);
  Logger.log(`Server started on port ${port}`);
}
bootstrap();
