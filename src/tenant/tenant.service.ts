import { Injectable, NotFoundException } from '@nestjs/common';
import { Tenant, TenantCreateRequest, TenantPatchRequest } from './tenant.model';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantService {
  constructor(private readonly repo: TenantRepository) {}

  public async createTenant(request: TenantCreateRequest): Promise<Tenant> {
    const tenant = await this.repo.create(request);
    
    return tenant;
  }

  public async getTenantById(id: number): Promise<Tenant> {
    const tenant = await this.repo.findById(id);

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found!`);
    }

    return tenant;
  }

  public async patchTenantById(id: number, request: TenantPatchRequest): Promise<Tenant> {
    const tenant = await this.repo.patchById(id, request);

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found!`);
    }

    return tenant;
  }

  public async deleteTenantById(id: number): Promise<Tenant> {
    const tenant = await this.repo.deleteById(id);

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found!`);
    }

    return tenant;
  }
}
