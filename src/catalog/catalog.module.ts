import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '@/common/common.module';
import { Catalog, CatalogSchema } from './catalog.model';
import { CatalogRepository } from './catalog.repository';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [
    HttpModule,
    CommonModule,
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }], 'DEFAULT'),
  ],
  controllers: [CatalogController],
  providers: [CatalogService, CatalogRepository],
  exports: [CatalogService, CatalogRepository],
})
export class BucketModule {}
