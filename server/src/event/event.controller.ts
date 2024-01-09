import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { Cookies } from '../decorator/cookie.decorator';
import { COOKIE_UID } from '../constants/cookie';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  addEvent(@Cookies(COOKIE_UID) uId: string, @Body() body: any) {
    if (!uId) {
      return;
    }

    // TODO
    console.log(body);
  }
}
