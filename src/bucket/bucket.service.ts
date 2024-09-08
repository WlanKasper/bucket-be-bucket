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

  public async getBucketList(): Promise<Bucket[]> {
    return await this.repo.findAll();
  }

  // ---------- UPDATE/PATCH ----------

  public async patchBucketByID(id: string | Types.ObjectId, request: BucketPatchRequest): Promise<Bucket> {
    const patchedBucket = await this.repo.patchByID(id, request);

    if (!patchedBucket) {
      throw new NotFoundException(`Bucket with ID ${id} not found!`);
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
