import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
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
  @Get('sdk.js')
  getSDKLink(
    @Cookies(COOKIE_UID) uId: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    // cookie中没有用户id，则设置Cookie
    if (!uId) {
      response.cookie(COOKIE_UID, `dw_${uuid()}`, {
        httpOnly: true,
      });
    }

    const route = request.path.replace('sdk.js', '');
    const url = `${request.protocol}://${request.headers['host']}${
      route.length === 1 ? '/' : route
    }static/dream_weave.js`;
    return `
    var script=document.createElement('script');
    script.src=${url};
    script.async=true;
    script.defer=true;
    document.head.appendChild(script);`;
  }
}
