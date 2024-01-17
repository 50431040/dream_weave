import { IsNotEmpty } from 'class-validator';
import { AppPlatform } from '../enum/app.enum';

export class AddAppDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  platform: AppPlatform;
}
