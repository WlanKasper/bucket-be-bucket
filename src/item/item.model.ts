import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Item {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true, default: false })
  isChecked: boolean;
}

export interface ItemCreateRequest {
  label: string;
}

export interface ItemPatchRequest {
  label?: string;
  isChecked?: boolean;
}

export type ItemDocument = Item & Document;
export type ItemRef = Item | MongooseSchema.Types.ObjectId;

export const ItemSchema = SchemaFactory.createForClass(Item);
