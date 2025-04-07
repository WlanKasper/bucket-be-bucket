import { Injectable, NotFoundException } from '@nestjs/common';
import { Tenant, TenantCreateRequest, TenantPatchRequest } from './tenant.model';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(private readonly repo: TenantRepository) {}

  public async createTenant(request: TenantCreateRequest): Promise<Tenant> {
    return await this.repo.create(request);
  }

  public async getTenantById(id: number): Promise<Tenant> {
    const tenant = await this.repo.findById(id);

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found!`);
    }

    return tenant;
  }

  public async patchTenantById(id: number, request: TenantPatchRequest): Promise<Tenant> {
    const patchedTenant = await this.repo.patchById(id, request);

    if (!patchedTenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found!`);
    }

    return patchedTenant;
  }

  public async deleteTenantById(id: number): Promise<Tenant> {
    const deletedTenant = await this.repo.deleteById(id);

    if (!deletedTenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found!`);
    }

    return deletedTenant;
  }
  
}
