import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '@/common/common.module';
import { Bucket, BucketSchema } from './bucket.model';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { BucketRepository } from './bucket.repository';

@Module({
  imports: [
    HttpModule,
    CommonModule,
    MongooseModule.forFeature([{ name: Bucket.name, schema: BucketSchema }], 'DEFAULT'),
  ],
  controllers: [BucketController],
  providers: [BucketService, BucketRepository],
  exports: [BucketService, BucketRepository],
})
export class BucketModule {}
