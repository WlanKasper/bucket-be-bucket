import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Schema, Types } from "mongoose";

export class Item {
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
export type ItemRef = Item | Schema.Types.ObjectId;

export const ItemSchema = SchemaFactory.createForClass(Item);