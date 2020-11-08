import { Injectable } from '@nestjs/common';
import * as needle from 'needle';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { ResponseDTO } from 'src/models/dtos/response.dto';
import { PuppeteerService } from 'src/common/services/puppeteer.service';
import { info } from 'console';

@Injectable()
export class WebScraperService {
    constructor(private readonly puppeteerService: PuppeteerService) {}

    private async sendRequest(httpMethod: string, url: string): Promise<any> {
        return await needle(httpMethod, url);
    }

    async isWebpageExists(url: string) {
        const resDto = new ResponseDTO({
            content: null,
            success: true,
            errMsg: null
        });
        const errGlobalMsg = 'The respective webpage has been removed or deleted, or the owner completely shut down the website.';
        const errProtectiveMsg = 'The respective webpage refused access due to protective reasons.';
        return this.sendRequest('get', url).then(res => {
            if (res.statusCode == 200) {
                // If webpage does not allow others to embed an iframe with their website in it.
                if (
                    res.headers['x-frame-options']?.toString().toUpperCase() == 'SAMEORIGIN' ||
                    res.headers['x-frame-options']?.toString().toUpperCase() == 'DENY'
                ) {
                    throw new Error(errProtectiveMsg);
                }
                resDto.data.content = res.statusMessage;
                return resDto;
            } else {
                throw new Error(errGlobalMsg);
            }
        }).catch(err => {
            resDto.data.success = false;
            resDto.data.errMsg = err.message === errProtectiveMsg ? errProtectiveMsg : errGlobalMsg;
            return resDto;
        });
    }

    async fetchHTMLData(
        url: string,
        dataObj: { property: string, selector: string, type: string }
    ) {
        try {
            const browser = await this.puppeteerService.launchBrowser();
            const page = await this.puppeteerService.getNewPage(browser);

            await this.puppeteerService.gotoPage(page, url);
            
            let data = await page.$$eval(
                dataObj.selector,
                (elms, dtObj) => elms.map(e => e[dtObj.type].trim()), dataObj
            );

            data = data.map(dt => { return { [dataObj.property]: dt };  });

            await this.puppeteerService.closeBrowser(browser);

            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async fetchScrapedData(url: string, data: Array<any>) {
        const resDto = new ResponseDTO({
            content: null,
            success: true,
            errMsg: null
        });
        try {
            return Promise.all(await data.map(async dt => {
                // Array[ { property: value } .... ]
                let scrapedDt = await this.fetchHTMLData(url, dt);
                return scrapedDt;
            })).then(result => {
                let newResult = [];
                result.forEach((dataRow: Array<any>, i) => {
                    dataRow.forEach((dataCol, j) => {
                        if (i == 0) {
                            newResult.push(dataCol);
                        } else {
                            newResult[j] = { ...newResult[j], ...dataCol };
                        }
                    });
                });
                resDto.data.content = newResult;
                return resDto;
            });
        } catch (e) {
            resDto.data.success = false;
            resDto.data.errMsg = e.message;
            return resDto;
        }
    }
}
