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
   * init SDK
   * If there is no cookie, set the cookie
   */
  @Get('init')
  initSDK(
    @Cookies(COOKIE_UID) uId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!uId) {
      response.cookie(COOKIE_UID, `dw_${uuid()}`, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
    }

    response.status(200);
  }
}
