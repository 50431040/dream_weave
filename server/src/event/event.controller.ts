import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { Cookies } from '../decorator/cookie.decorator';
import { COOKIE_UID } from '../constants/cookie';
import { InjectQueue } from '@nestjs/bull';
import { EVENT_QUEUE } from 'src/constants/bull';
import { Queue } from 'bull';
import { EventDTO } from './event.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('event')
export class EventController {
  constructor(@InjectQueue(EVENT_QUEUE) private eventQueue: Queue) {}

  @ApiBody({ type: [EventDTO] })
  @Post()
  async addEvent(@Cookies(COOKIE_UID) uId: string, @Body() body: EventDTO[]) {
    if (!uId) {
      return;
    }

    for (const event of body) {
      event.deviceId = uId;
      await this.eventQueue.add(event, {
        removeOnComplete: true,
      });
    }
  }
}
