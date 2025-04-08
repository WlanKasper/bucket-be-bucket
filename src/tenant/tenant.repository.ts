import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant, TenantCreateRequest, TenantDocument, TenantPatchRequest } from './tenant.model';

@Injectable()
export class TenantRepository {
  constructor(@InjectModel(Tenant.name, 'DEFAULT') private tenantModel: Model<TenantDocument>) {}

  public async create(data: TenantCreateRequest): Promise<Tenant> {
    const tenant = new this.tenantModel(data);
    return tenant.save();
  }

  public async findById(id: number): Promise<Tenant | null> {
    return this.tenantModel.findOne({ id }).populate('catalogs').exec();
  }

  public async patchById(id: number, updates: TenantPatchRequest): Promise<Tenant | null> {
    return this.tenantModel.findOneAndUpdate({ id }, updates, { new: true }).populate('catalogs').exec();
  }

  public async deleteById(id: number): Promise<Tenant | null> {
    return this.tenantModel.findOneAndDelete({ id }).populate('catalogs').exec();
  }
}
