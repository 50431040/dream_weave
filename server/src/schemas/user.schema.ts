import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../enum/role.enum';

export type UserDocument = UserModel & Document;

/**
 * User
 */
@Schema()
export class UserModel {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop()
  mobile?: string;

  @Prop()
  email?: string;

  @Prop({ default: new Date() })
  createTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
