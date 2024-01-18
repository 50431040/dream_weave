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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const isProduction = process.env.ENV === 'production';

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
        const msg = isProduction
          ? 'params invalid'
          : Object.values(errors[0].constraints)[0];
        return new BadRequestException({
          message: msg,
          code: HttpStatus.BAD_REQUEST,
        });
      },
    }),
  );

  if (!isProduction) {
    const options = new DocumentBuilder()
      .setTitle('Dream Weave')
      .setDescription('Dream Weave Api')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
