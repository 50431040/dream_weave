import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { AuthJwtModule } from '../auth-jwt/auth-jwt.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    AuthJwtModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
