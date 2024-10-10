import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
const allowedOrigins = ["https://h5.zdn.vn", "zbrowser://h5.zdn.vn", 'http://localhost:3080'];
  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.use((req, res, next) => {
    const origin = req.headers.origin as string;
    if (origin) {
      const allowedCors = allowedOrigins.some((element) => origin.startsWith(element));
      if (allowedCors) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
      }
    }
    next();
  });

  app.use(express.static("."));

  await app.listen(process.env.PORT || 3080) 

}

bootstrap();