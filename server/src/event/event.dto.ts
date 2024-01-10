import { IsNotEmpty } from 'class-validator';

export class EventDTO {
  @IsNotEmpty()
  appId: string;

  userId?: string;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  uri: string;

  @IsNotEmpty()
  timestamp: Date;

  @IsNotEmpty()
  version: string;

  @IsNotEmpty()
  name: string;

  params?: Record<string, any>;

  [key: string]: any;
}
