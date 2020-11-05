import { Module } from '@nestjs/common';
import { WebScraperController } from './web-scraper.controller';
import { WebScraperService } from './web-scraper.service';

@Module({
    imports: [],
    controllers: [WebScraperController],
    providers: [WebScraperService],
    exports: [WebScraperService]
})
export class WebScraperModule {}
