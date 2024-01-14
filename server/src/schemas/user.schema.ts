import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseField } from './base.schema';

export type EventDocument = UserModel & Document;

/**
 * User
 */
@Schema()
export class UserModel extends BaseField {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  mobile?: string;

  @Prop()
  email?: string;

  @Prop({ default: new Date() })
  createTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
