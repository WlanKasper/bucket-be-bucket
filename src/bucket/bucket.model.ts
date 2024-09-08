import { ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class Bucket {
  id: ObjectId;

  @Prop({ required: true })
  label: string;
  @Prop({ required: true, default: [] })
  data: BucketItem[];
}

export interface BucketItem {
  id: string;
  data: string;
  isChecked: boolean;
}

export interface BucketCreateRequest {
  label: string;
  data?: BucketItem[];
}

export interface BucketPatchRequest {
  id: string;
  label?: string;
  data?: BucketItem[];
}

export type BucketDocument = Bucket & Document;
export type BucketRef = Bucket | MongooseSchema.Types.ObjectId;

export const BucketSchema = SchemaFactory.createForClass(Bucket);
