import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebScraperModule } from './modules/web-scraper/web-scraper.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front')
    }),
    WebScraperModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
