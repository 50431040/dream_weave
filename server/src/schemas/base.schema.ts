import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * 基础字段
 */
export class BaseField extends Document {
  /**
   * APPID
   */
  @Prop()
  appId: string;
  /**
   * 唯一用户ID
   */
  @Prop()
  userId: string;
  /**
   * 来源
   */
  @Prop()
  origin: string;
  /**
   * 完整URI
   */
  @Prop()
  uri: string;
  /**
   * 版本
   */
  @Prop({ required: true })
  version: string;
  /**
   * 上传时间
   */
  @Prop({ required: true })
  timestamp: string;
}
