import { Injectable, NotFoundException } from '@nestjs/common';
import { Bucket, BucketCreateRequest, BucketPatchRequest } from './bucket.model';
import { BucketRepository } from './bucket.repository';
import { Types } from 'mongoose';

@Injectable()
export class BucketService {
  constructor(private readonly repo: BucketRepository) {}

  // ---------- CREATE ----------

  public async createBucket(request: BucketCreateRequest): Promise<Bucket> {
    return await this.repo.create(request);
  }

  // ---------- READ ----------

  public async getBucketList(userId: string): Promise<Bucket[]> {
    return await this.repo.findAll(userId);
  }

  // ---------- UPDATE/PATCH ----------

  public async patchBucketByID(request: BucketPatchRequest): Promise<Bucket> {
    const patchedBucket = await this.repo.patchByID(request);

    if (!patchedBucket) {
      throw new NotFoundException(`Bucket with ID ${request.id} not found!`);
    }

    return patchedBucket;
  }

  // ---------- DELETE ----------

  public async deleteBucketByID(id: string | Types.ObjectId): Promise<Bucket> {
    const deletedBucket = await this.repo.deleteByID(id);

    if (!deletedBucket) {
      throw new NotFoundException(`Bucket with ID ${id} not found!`);
    }

    return deletedBucket;
  }
}
