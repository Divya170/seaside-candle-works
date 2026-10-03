import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ShopModule } from './shop/shop.module';
import { OrdersModule } from './orders/orders.module';
import { MessagesModule } from './messages/messages.module';
import { AdminModule } from './admin/admin.module';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabaseModule, ShopModule, OrdersModule, MessagesModule, AdminModule],
  controllers: [HealthController],
})
export class AppModule {}
