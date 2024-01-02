import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EventDocument,
} from '../schemas/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel('event') private eventModel: Model<EventDocument>) {}

  /**
   * 新增事件
   * @param appId APPID
   * @param eventId 事件ID
   * @param name 事件名
   * @param params 其他参数
   */
  async add(
    appId: string,
    eventId: string,
    name: string,
    params?: Record<string, any>,
  ) {
    const data = new this.eventModel({
      appId,
      eventId,
      name,
      params: params,
    });
    await data.save();
  }

  async list(appId: string) {
    const result = await this.eventModel.find({
      appId,
    });
    return result;
  }
}
