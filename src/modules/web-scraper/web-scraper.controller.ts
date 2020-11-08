import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { WebScraperService } from './web-scraper.service';

@Controller('web-scraper')
export class WebScraperController {
    constructor(private readonly webScraperService: WebScraperService) {}

    @Post('url/validate')
    async isWebpageExists(@Body('url') url: string) {
        return await this.webScraperService.isWebpageExists(url);
    }

    // @Post('html/data')
    // async fetchHTMLData(@Body('url') url: string, @Body('data') data: any) {
    //     // return await this.webScraperService.fetchHTMLData(url, data);
    // }

    @Post('data')
    async fetchScrapedData(
        @Body('url') url: string,
        @Body('data') data: Array<any>
    ) {
        return await this.webScraperService.fetchScrapedData(url, data);
    }
}
