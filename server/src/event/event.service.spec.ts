import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from '../schemas/event.schema';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath:
            process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              uri: configService.get('MONGODB_URI'),
            };
          },
        }),
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
      ],
      providers: [EventService],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    await service.add('123', '456', '测试埋点');

    const result = await service.list('123');
    expect(result.length).toBe(1)
  });
});
