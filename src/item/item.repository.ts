import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Item, ItemCreateRequest, ItemDocument, ItemPatchRequest } from './item.model';

@Injectable()
export class ItemRepository {
  constructor(@InjectModel(Item.name, 'DEFAULT') private itemModel: Model<ItemDocument>) {}

  public async create(request: ItemCreateRequest): Promise<ItemDocument> {
    return this.itemModel.create({
      label: request.label,
    });
  }

  public async findById(id: string | Types.ObjectId): Promise<ItemDocument | undefined> {
    return this.itemModel.findById(id).exec();
  }

  public async patchById(id: string | Types.ObjectId, request: ItemPatchRequest): Promise<ItemDocument | undefined> {
    return this.itemModel
      .findByIdAndUpdate(id, request, { new: true })
      .exec();
  }

  public async deleteById(id: string | Types.ObjectId): Promise<ItemDocument | undefined> {
    return this.itemModel.findByIdAndDelete(id, { returnDocument: 'before' }).exec();
  }
}
