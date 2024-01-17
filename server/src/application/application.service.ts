import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplicationDocument } from '../schemas/application.schema';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('application')
    private applicationModel: Model<ApplicationDocument>,
  ) {}

  async isApplicationExist(name: string, platform: string) {
    const app = await this.applicationModel.findOne({
      name,
      platform,
    });
    if (app) {
      return true;
    }

    return false;
  }

  async addApplication(name: string, platform: string, creatorId: string) {
    return await this.applicationModel.create({
      name,
      platform,
      creatorId,
    });
  }
}
