import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseField } from './base.schema';

export type EventDocument = Event & Document;

/**
 * 事件
 */
@Schema()
export class EventModel extends BaseField {
  /**
   * 事件名
   */
  @Prop({ required: true })
  name: string;

  /**
   * 创建时间
   */
  @Prop({ default: new Date() })
  createTime: Date;
}

export const EventSchema = SchemaFactory.createForClass(EventModel);
