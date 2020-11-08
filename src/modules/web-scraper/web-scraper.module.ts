import { Module } from '@nestjs/common';
import { PuppeteerService } from 'src/common/services/puppeteer.service';
import { WebScraperController } from './web-scraper.controller';
import { WebScraperService } from './web-scraper.service';

@Module({
    imports: [],
    controllers: [WebScraperController],
    providers: [WebScraperService, PuppeteerService],
    exports: [WebScraperService, PuppeteerService]
})
export class WebScraperModule {}
