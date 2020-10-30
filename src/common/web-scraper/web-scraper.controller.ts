import { Controller, Get, Logger, Param } from '@nestjs/common';
import { WebScraperService } from './web-scraper.service';

@Controller('web-scraper')
export class WebScraperController {
    constructor(private readonly webScraperService: WebScraperService) {}

    @Get('data')
    async fetchHTMLData(@Param('url') url: string) {
        Logger.log(`url: ${url}`);
        return await this.webScraperService.fetchHTMLData(url);
    }
}
