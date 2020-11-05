import { Injectable } from '@nestjs/common';
import * as needle from 'needle';
import { ResponseDTO } from 'src/models/dtos/response.dto';

@Injectable()
export class WebScraperService {
    constructor() {}

    sendRequest(httpMethod: string, url: string): Promise<any> {
        return needle(httpMethod, url);
    }

    async isWebpageExists(url: string) {
        const resDto = new ResponseDTO({
            content: null,
            success: true,
            errMsg: null
        });
        const errGlobalMsg = 'The respective webpage has been removed or deleted, or the owner completely shut down the website.';
        const errProtectiveMsg = 'The respective webpage refused access due to protective reasons.';
        return needle('get', url).then(res => {
            if (res.statusCode == 200) {
                // If webpage does not allow others to embed an iframe with their website in it.
                if (
                    res.headers['x-frame-options']?.toString().toUpperCase() == 'SAMEORIGIN' ||
                    res.headers['x-frame-options']?.toString().toUpperCase() == 'DENY'
                ) {
                    console.log('enter frame err');
                    throw new Error(errProtectiveMsg);
                }
                resDto.data.content = res.statusMessage;
                return resDto;
            } else {
                console.log('enter global err');
                throw new Error(errGlobalMsg);
            }
        }).catch(err => {
            console.log(err.message);
            resDto.data.success = false;
            resDto.data.errMsg = err.message === errProtectiveMsg ? errProtectiveMsg : errGlobalMsg;
            return resDto;
        });
    }

    async fetchHTMLData(url: string) {
        const resDto = new ResponseDTO({
            content: null,
            success: true,
            errMsg: null
        });
        try {
            const urlData = await this.sendRequest('get', url);
            resDto.data.content = urlData;
        } catch (e) {
            resDto.data.errMsg = e.message;
        } finally {
            return await resDto;
        }
    }
}
