import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AppPlatform } from '../enum/app.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AddAppDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsEnum(AppPlatform)
  @IsNotEmpty()
  platform: AppPlatform;
}
