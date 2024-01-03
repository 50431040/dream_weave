import { Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';
import { Cookies } from '../decorator/cookie.decorator';
import { COOKIE_UID } from '../constants/cookie';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  addEvent(@Cookies(COOKIE_UID) uId: string) {
    if (!uId) {
      return;
    }

    // TODO
  }
}
