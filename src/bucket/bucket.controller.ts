import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { Bucket, BucketCreateRequest, BucketPatchRequest } from './bucket.model';
import { BucketService } from './bucket.service';

@Controller('api/bucket')
export class BucketController {
  private logger = new Logger(BucketController.name);

  constructor(private readonly bucketService: BucketService) {}

  // ---------- CREATE ----------

  @Post()
  public async createBucket(@Body() requestBody: BucketCreateRequest[]): Promise<Bucket[]> {
    const createdBucketList: Bucket[] = [];

    const createBucketPromises = requestBody.map(async (request) => {
      try {
        const createdBucket = await this.bucketService.createBucket(request);
        this.logger.log(`Bucket created with ID: ${createdBucket.id}`);
        createdBucketList.push(createdBucket);
      } catch (error) {
        this.logger.error(`Error creating bucket: ${error.message}`);
        throw error;
      }
    });

    await Promise.all(createBucketPromises);

    return createdBucketList;
  }

  // ---------- READ ----------

  @Get()
  public async getBucketList(): Promise<Bucket[]> {
    try {
      const bucketList = await this.bucketService.getBucketList();
      this.logger.log(`Retrieved ${bucketList.length} buckets`);
      return bucketList;
    } catch (error) {
      this.logger.error(`Error getting bucket list: ${error.message}`);
      throw error;
    }
  }

  // ---------- UPDATE/PATCH ----------

  @Patch(':id')
  public async patchBucketByID(@Param('id') id: string, @Body() requestBody: BucketPatchRequest): Promise<Bucket> {
    try {
      const patchedBucket = await this.bucketService.patchBucketByID(id, requestBody);
      this.logger.log(`Bucket patched with ID: ${patchedBucket.id}`);
      return patchedBucket;
    } catch (error) {
      this.logger.error(`Error patching bucket by ID: ${error.message}`);
      throw error;
    }
  }

  // ---------- DELETE ----------

  @Delete()
  public async deleteBucketByID(@Param('id') id: string): Promise<Bucket> {
    try {
      const deletedBucket = await this.bucketService.deleteBucketByID(id);
      this.logger.log(`Bucket deleted with ID: ${deletedBucket.id}`);
      return deletedBucket;
    } catch (error) {
      this.logger.error(`Error deleting bucket by ID: ${error.message}`);
      throw error;
    }
  }
}
