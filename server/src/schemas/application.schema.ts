import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AppPlatform } from '../enum/app.enum';

export type ApplicationDocument = ApplicationModel & Document;

/**
 * Application
 */
@Schema()
export class ApplicationModel {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: AppPlatform, required: true })
  platform: AppPlatform;

  @Prop({ type: Types.ObjectId, required: true })
  creatorId: Types.ObjectId;

  @Prop({ default: new Date() })
  createTime: Date;

  @Prop({ default: new Date() })
  updateTime: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(ApplicationModel);
