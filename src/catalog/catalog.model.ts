import { Item } from "@/item/item.model";
import { Tenant } from "@/tenant/tenant.model";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema, Types } from "mongoose";

export class Catalog {
    id: Types.ObjectId;

    @Prop({ required: true , default: [] })
    tenants: Tenant[];

    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, default: [] })
    items: Item[];
}

export interface CatalogCreateRequest {
    tenants: number[];
    name: string;
    description: string;
    items: Item[];
}

export interface CatalogPatchRequest {
    tenants?: number[];
    name?: string;
    description?: string;
    items?: Item[];
}

export type CatalogDocument = Catalog & Document;
export type CatalogRef = Catalog | Schema.Types.ObjectId;

export const CatalogSchema = SchemaFactory.createForClass(Catalog);