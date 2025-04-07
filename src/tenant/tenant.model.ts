import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export class Tenant {
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: false })
  avatar_url?: string;
}

export interface TenantCreateRequest {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
}

export interface TenantPatchRequest {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export type TenantDocument = Tenant & Document;
export type TenantRef = Tenant | Schema.Types.ObjectId;

export const TenantSchema = SchemaFactory.createForClass(Tenant);
