import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Catalog, CatalogCreateRequest, CatalogDocument, CatalogPatchRequest } from './catalog.model';

@Injectable()
export class CatalogRepository {
  constructor(@InjectModel(Catalog.name, 'DEFAULT') private catalogModel: Model<CatalogDocument>) {}

  public async create(request: CatalogCreateRequest): Promise<Catalog> {
    const catalog = new this.catalogModel(request);
    return catalog.save();
  }

  public async findById(id: string | Types.ObjectId): Promise<Catalog | null> {
    return this.catalogModel.findById(id).populate('items').exec();
  }

  public async patchById(id: string | Types.ObjectId, request: CatalogPatchRequest): Promise<Catalog | null> {
    const updatePayload: Partial<Catalog> = {
      ...request,
    };

    return this.catalogModel.findByIdAndUpdate(id, updatePayload, { new: true }).populate('items').exec();
  }

  public async deleteById(id: string | Types.ObjectId): Promise<Catalog | null> {
    return this.catalogModel.findByIdAndDelete(id, { returnDocument: 'before' }).populate('items').exec();
  }
}
