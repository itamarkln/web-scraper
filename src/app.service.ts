import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './models/dtos/response.dto';

@Injectable()
export class AppService {
  getHello(): any {
    return new ResponseDTO({
      content: 'Hello World!',
      success: true,
      errMsg: null,
    });
  }
}
