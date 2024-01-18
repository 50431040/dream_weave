import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  appId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  uri: string;

  @ApiProperty({ required: true, default: new Date() })
  @IsDate()
  @IsNotEmpty()
  timestamp: Date;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  version: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  params?: Record<string, any>;

  [key: string]: any;
}
