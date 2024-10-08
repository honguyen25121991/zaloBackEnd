import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [BookModule,ConfigModule.forRoot(
    {
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }
  ), CustomerModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
