import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '@/common/common.module';
import { Tenant, TenantSchema } from './tenant.model';
import { TenantRepository } from './tenant.repository';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { Catalog, CatalogSchema } from '@/catalog/catalog.model';
import { Item, ItemSchema } from '@/item/item.model';

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
  controllers: [TenantController],
  providers: [TenantService, TenantRepository],
  exports: [TenantService, TenantRepository],
})
export class TenantModule {}
