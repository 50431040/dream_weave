import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventDocument } from '../schemas/event.schema';
import { EventDTO } from './event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel('event') private eventModel: Model<EventDocument>) {}

  /**
   * 新增事件
   */
  async add(event: EventDTO) {
    const data = new this.eventModel(event);
    await data.save();
  }

  async list(appId: string) {
    const result = await this.eventModel.find({
      appId,
    });
    return result;
  }
}
