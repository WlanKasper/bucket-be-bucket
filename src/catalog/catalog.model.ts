import { Item } from '@/item/item.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Catalog extends Document  {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Item' }], default: [] })
  items: Item[];
}

export interface CatalogCreateRequest {
  name: string;
  description: string;
  items?: Item[];
}

export interface CatalogPatchRequest {
  name?: string;
  description?: string;
  items?: Item[];
}

export type CatalogDocument = Catalog & Document;
export type CatalogRef = Catalog | Types.ObjectId;

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
