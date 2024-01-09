import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EVENT_QUEUE } from '../constants/bull';
import { EventService } from './event.service';
import { EventDTO } from './event.dto';

@Processor(EVENT_QUEUE)
export class EventProcessor {
  constructor(private readonly eventService: EventService) {}

  @Process()
  async transcode(job: Job<EventDTO>) {
    const data = job.data;
    this.eventService.add(data);
    job.finished();
  }
}
