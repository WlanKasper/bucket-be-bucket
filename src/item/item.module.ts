import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '@/common/common.module';
import { Item, ItemSchema } from './item.model';
import { ItemRepository } from './item.repository';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Tenant, TenantSchema } from '@/tenant/tenant.model';
import { Catalog, CatalogSchema } from '@/catalog/catalog.model';

@Module({
  imports: [
    HttpModule,
    CommonModule,
    MongooseModule.forFeature(
      [
        { name: Tenant.name, schema: TenantSchema },
        { name: Catalog.name, schema: CatalogSchema },
        { name: Item.name, schema: ItemSchema },
      ],
      'DEFAULT',
    ),
  ],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemService, ItemRepository],
})
export class ItemModule {}
