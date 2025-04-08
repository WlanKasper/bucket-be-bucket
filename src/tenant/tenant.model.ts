import { Catalog } from '@/catalog/catalog.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tenant extends Document {
  @Prop({ required: true, unique: true, index: true })
  user_id: number;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: false })
  avatar_url?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Catalog' }], default: [] })
  catalogs: Catalog[];
}

export interface TenantCreateRequest {
  user_id: number;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  catalogs?: string[];
}

export interface TenantPatchRequest {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  catalogs?: string[];
}

export type TenantDocument = Tenant & Document;
export type TenantRef = Tenant | Types.ObjectId;

export const TenantSchema = SchemaFactory.createForClass(Tenant);
