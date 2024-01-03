import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Cookies } from './decorator/cookie.decorator';
import { v4 as uuid } from 'uuid';
import { COOKIE_UID } from './constants/cookie';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 获取SDK
   * 没有Cookie，则设置Cookie
   */
  @Get()
  getSDKLink(
    @Cookies(COOKIE_UID) uId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    // cookie中没有用户id，则设置Cookie
    if (!uId) {
      response.cookie(COOKIE_UID, `dw_${uuid()}`, {
        httpOnly: true,
      });
    }
    // TODO
    return ``;
  }
}
