import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant, TenantCreateRequest, TenantDocument, TenantPatchRequest } from './tenant.model';

@Injectable()
export class TenantRepository {
  constructor(@InjectModel(Tenant.name, 'DEFAULT') private tenantModel: Model<TenantDocument>) {}

  public async create(request: TenantCreateRequest): Promise<TenantDocument> {
    return this.tenantModel.create({
      id: request.id,
      first_name: request.first_name,
      last_name: request.last_name,
      avatar_url: request.avatar_url,
    });
  }

  public async findById(id: number): Promise<TenantDocument | undefined> {
    return this.tenantModel.findById(id).exec();
  }

  public async patchById(id: number, request: TenantPatchRequest): Promise<TenantDocument | undefined> {
    return this.tenantModel
      .findByIdAndUpdate(
        id,
        {
          first_name: request.first_name,
          last_name: request.last_name,
          avatar_url: request.avatar_url,
        },
        { new: true },
      )
      .exec();
  }

  public async deleteById(id: number): Promise<TenantDocument | undefined> {
    return this.tenantModel.findByIdAndDelete(id, { returnDocument: 'before' }).exec();
  }
}
