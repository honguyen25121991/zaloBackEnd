import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
const allowedOrigins = ["https://h5.zdn.vn", "zbrowser://h5.zdn.vn", 'http://localhost:3080'];
  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.use((req, res, next) => {
    const origin = req.headers.origin as string;
    console.log('origin', origin);
    console.log('req.headers', req.headers);
    console.log('req.header.origin', req.headers.host);
    if (origin) {
      const allowedCors = allowedOrigins.some((element) => origin.startsWith(element));
      console.log('allowedCors', allowedCors);
      if (allowedCors) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
      }
    }
    next();
  });

  app.use(express.static("."));

  await app.listen(3080);
}

bootstrap();