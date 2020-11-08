import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
    constructor() {}

    async launchBrowser() {
        return await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ]
        });
    }

    async getNewPage(browser: any) {
        return await browser.newPage();
    }

    async gotoPage(page: any, url: string) {
        await page.goto(url);
    }

    async getHTMLBody(page: any) {
        const bodyHandle = await page.$('body');
        return await page.evaluate(body => body, bodyHandle);
    }

    async closeBrowser(browser: any) {
        await browser.close();
    }

    async getHTMLElements(page: any, selector: string) {
        return await page.$$(selector);
    }

    async getHTMLElement(page: any, selector: string) {
        return await page.$(selector);
    }

    async getHTMLElementData(page: any, element: any, attr: string) {
        return await page.evaluate(e => e.getAttribute(attr), element);
        // return await page.evaluate(`document.querySelector('${element}').getAttribute(${attr})`);
    }
}