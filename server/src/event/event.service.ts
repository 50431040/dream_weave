import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from '../schemas/event.schema';
import { EventDTO } from './event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel('event') private eventModel: Model<EventDocument>) {}
  logger = new Logger('EventService');

  /**
   * 新增事件
   */
  async add(event: EventDTO) {
    try {
      const data = new this.eventModel(event);
      await data.save();
    } catch (err) {
      this.logger.error(err);
    }
  }

  async list(appId: string) {
    const result = await this.eventModel.find({
      appId,
    });
    return result;
  }
}
