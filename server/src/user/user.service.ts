import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { md5 } from '../utils';
import { UserRole } from '../enum/role.enum';
import { UserLoginDTO } from './user.dto';
import { AuthService } from '../auth-jwt/auth-jwt.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel('user') private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  logger = new Logger('UserService');

  onModuleInit() {
    this.initAdminAccount();
  }

  async initAdminAccount() {
    const user = await this.userModel.findOne({
      role: UserRole.ADMIN,
    });
    if (user) {
      this.logger.log('admin account already exists');
      return;
    }

    if (process.env.ADMIN_USER && process.env.ADMIN_PASSWORD) {
      const user = new this.userModel({
        username: process.env.ADMIN_USER,
        password: md5(process.env.ADMIN_PASSWORD),
        role: UserRole.ADMIN,
      });
      await user.save();
      this.logger.log('init admin account success');
      return;
    }

    this.logger.error('please set ADMIN_USER and ADMIN_PASSWORD in .env file');
  }

  async login(userLoginDTO: UserLoginDTO) {
    const user = await this.userModel.findOne({
      username: userLoginDTO.username,
      password: userLoginDTO.password,
    });
    if (!user) {
      throw new NotFoundException('invalid username or password');
    }

    const token = await this.authService.login(user.id);
    return {
      username: user.username,
      token,
    };
  }
}
