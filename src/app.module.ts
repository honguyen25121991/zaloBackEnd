import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot(
    {
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }
  ), CustomerModule,OrderModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
