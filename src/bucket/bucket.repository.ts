import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Bucket, BucketCreateRequest, BucketDocument, BucketPatchRequest } from './bucket.model';

@Injectable()
export class BucketRepository {
  constructor(@InjectModel(Bucket.name, 'DEFAULT') private bucketModel: Model<BucketDocument>) {}

  // ---------- CREATE ----------

  public async create(request: BucketCreateRequest): Promise<BucketDocument> {
    return this.bucketModel.create({
      lable: request.label,
      data: request.data,
    });
  }

  // ---------- READ ----------

  public async findByID(id: string | Types.ObjectId): Promise<BucketDocument | undefined> {
    return this.bucketModel.findById(id).exec();
  }

  public async findAll(): Promise<Bucket[]> {
    return this.bucketModel.find().exec();
  }

  // ---------- UPDATE/PATCH ----------

  public async patchByID(
    id: string | Types.ObjectId,
    request: BucketPatchRequest,
  ): Promise<BucketDocument | undefined> {
    if (!ObjectId.isValid(id)) {
      return undefined;
    }

    return this.bucketModel
      .findByIdAndUpdate(
        id,
        {
          lable: request.label,
          data: request.data,
        },
        { upsert: false },
      )
      .exec();
  }

  // ---------- DELETE ----------

  public async deleteByID(id: string | Types.ObjectId): Promise<BucketDocument | undefined> {
    if (!ObjectId.isValid(id)) {
      return undefined;
    }

    return this.bucketModel.findByIdAndDelete(id, { returnDocument: 'before' }).exec();
  }

  public async deleteAll() {
    await this.bucketModel.deleteMany({});
  }
}
