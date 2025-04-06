import { ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class Bucket {
  id: ObjectId;

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: [] })
  data: BucketItem[];
}

export interface BucketItem {
  id: string;
  data: string;
  isChecked: boolean;
}

export interface BucketCreateRequest {
  userId: string;
  name: string;
  description: string;
  data?: BucketItem[];
}

export interface BucketPatchRequest {
  id: string;
  userId: string;
  name?: string;
  description?: string;
  data?: BucketItem[];
}

export type BucketDocument = Bucket & Document;
export type BucketRef = Bucket | MongooseSchema.Types.ObjectId;

export const BucketSchema = SchemaFactory.createForClass(Bucket);
