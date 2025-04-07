import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Catalog, CatalogCreateRequest, CatalogDocument, CatalogPatchRequest } from './catalog.model';

@Injectable()
export class CatalogRepository {
  constructor(@InjectModel(Catalog.name, 'DEFAULT') private catalogModel: Model<CatalogDocument>) {}

  public async create(request: CatalogCreateRequest): Promise<CatalogDocument> {
    return this.catalogModel.create({
      name: request.name,
      description: request.description
    });
  }

  public async findById(id: Types.ObjectId): Promise<CatalogDocument | undefined> {
    return this.catalogModel.findById(id).exec();
  }

  public async patchById(id: Types.ObjectId, request: CatalogPatchRequest): Promise<CatalogDocument | undefined> {
    return this.catalogModel
      .findByIdAndUpdate(
        id,
        {
          tenants: request.tenants,
          name: request.name,
          description: request.description,
          items: request.items,
        },
        { new: true },
      )
      .exec();
  }

  public async deleteById(id: Types.ObjectId): Promise<CatalogDocument | undefined> {
    return this.catalogModel.findByIdAndDelete(id, { returnDocument: 'before' }).exec();
  }
}
