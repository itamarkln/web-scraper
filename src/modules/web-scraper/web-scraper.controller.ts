import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { WebScraperService } from './web-scraper.service';

@Controller('web-scraper')
export class WebScraperController {
    constructor(private readonly webScraperService: WebScraperService) {}

    @Post('url/validate')
    async isWebpageExists(@Body('url') url: string) {
        return await this.webScraperService.isWebpageExists(url);
    }

    @Get('data')
    async fetchHTMLData(@Param('url') url: string) {
        Logger.log(`url: ${url}`);
        return await this.webScraperService.fetchHTMLData(url);
    }
}
