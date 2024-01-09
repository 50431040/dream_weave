import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        console.log(errors);
        const msg = Object.values(errors[0].constraints)[0];
        return new BadRequestException({
          message: msg,
          code: HttpStatus.BAD_REQUEST,
        });
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
