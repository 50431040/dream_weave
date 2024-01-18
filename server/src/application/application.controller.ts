import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Request,
} from '@nestjs/common';
import { AddAppDTO } from './application.dto';
import { ApplicationService } from './application.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async addApplication(@Body() addAppDTO: AddAppDTO, @Request() req) {
    const { name, platform } = addAppDTO;
    const isExist = await this.applicationService.isApplicationExist(
      name,
      platform,
    );
    if (isExist) {
      throw new ForbiddenException('Application already exist');
    }

    await this.applicationService.addApplication(name, platform, req.user.id);
  }
}
