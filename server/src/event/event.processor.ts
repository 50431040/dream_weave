import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EVENT_QUEUE } from '../constants/bull';
import { EventService } from './event.service';

@Processor(EVENT_QUEUE)
export class EventProcessor {
  constructor(private readonly eventService: EventService) {}

  async transcode(job: Job<any>) {
    const data = job.data;
    // TODO
    job.finished();
  }
}
