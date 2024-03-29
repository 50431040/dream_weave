import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from '../schemas/event.schema';
import { BullModule } from '@nestjs/bull';
import { EVENT_QUEUE } from '../constants/bull';
import { EventProcessor } from './event.processor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'event', schema: EventSchema }]),
    BullModule.registerQueue({
      name: EVENT_QUEUE,
    }),
  ],
  providers: [EventService, EventProcessor],
  controllers: [EventController],
})
export class EventModule {}
