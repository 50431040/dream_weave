import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { Cookies } from '../decorator/cookie.decorator';
import { COOKIE_UID } from '../constants/cookie';
import { InjectQueue } from '@nestjs/bull';
import { EVENT_QUEUE } from 'src/constants/bull';
import { Queue } from 'bull';

@Controller('event')
export class EventController {
  constructor(@InjectQueue(EVENT_QUEUE) private eventQueue: Queue) {}

  @Post()
  async addEvent(@Cookies(COOKIE_UID) uId: string, @Body() body: any) {
    if (!uId) {
      return;
    }

    await this.eventQueue.add(body);
  }
}
