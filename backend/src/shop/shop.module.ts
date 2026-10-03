import { Global, Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

@Global()
@Module({ providers: [ShopService], controllers: [ShopController], exports: [ShopService] })
export class ShopModule {}
