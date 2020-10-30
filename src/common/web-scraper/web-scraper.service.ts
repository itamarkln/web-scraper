import { Injectable, Logger } from '@nestjs/common';
import Axios from 'axios';
import { ResponseDTO } from 'src/models/dtos/response.dto';

@Injectable()
export class WebScraperService {
    constructor() {}

    async fetchHTMLData(url: string) {
        const resDto = new ResponseDTO({
            content: null,
            success: true,
            errMsg: null
        });
        try {
            const urlData = await Axios.get(url);
            resDto.data.content = urlData;
        } catch (e) {
            resDto.data.errMsg = e.message;
        } finally {
            return await resDto;
        }
    }
}
