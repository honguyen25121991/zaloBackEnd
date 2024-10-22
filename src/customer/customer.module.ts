import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as dotenv from 'dotenv';
import { CheckUserMiddleware } from 'src/middleware/checkUserMiddleware';

const IMGFOLDER = process.env.IMGFOLDER;
const API_VERSION = process.env.API_VERSION;

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: IMGFOLDER,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserMiddleware)
      .forRoutes({ path: `${API_VERSION}/customer/:id`, method: RequestMethod.PUT }); // Chỉ áp dụng middleware cho phương thức PUT
  }
}