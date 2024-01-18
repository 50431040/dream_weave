import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDTO {
  @ApiProperty({ required: true, default: 'admin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ required: true, default: 'e10adc3949ba59abbe56e057f20f883e' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
