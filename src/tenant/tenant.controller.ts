import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { Tenant, TenantCreateRequest, TenantPatchRequest } from './tenant.model';
import { TenantService } from './tenant.service';

@Controller('api/tenant')
export class TenantController {
  private logger = new Logger(TenantController.name);

  constructor(private readonly tenantService: TenantService) {}

  @Post()
  public async createTenant(@Body() requestBody: TenantCreateRequest): Promise<Tenant> {
    try {
      const tenant = await this.tenantService.createTenant(requestBody);
      this.logger.log(`Tenant created with ID: ${tenant.id}`);
      return tenant;
    } catch (error) {
      this.logger.error(`Error creating tenant: ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  public async getTenantById(@Param('id') id: number): Promise<Tenant> {
    try {
      const tenant = await this.tenantService.getTenantById(id);
      this.logger.log(`Found tenant with ID: ${tenant.id}`);
      return tenant;
    } catch (error) {
      this.logger.error(`Error getting tenant by ID: ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  public async patchTenantById(@Param('id') id: number, @Body() requestBody: TenantPatchRequest): Promise<Tenant> {
    try {
      const tenant = await this.tenantService.patchTenantById(id, requestBody);
      this.logger.log(`Tenant patched with ID: ${tenant.id}`);
      return tenant;
    } catch (error) {
      this.logger.error(`Error patching tenant by ID: ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteTenantById(@Param('id') id: number): Promise<Tenant> {
    try {
      const tenant = await this.tenantService.deleteTenantById(id);
      this.logger.log(`Tenant deleted with ID: ${tenant.id}`);
      return tenant;
    } catch (error) {
      this.logger.error(`Error deleting tenant by ID: ${error.message}`);
      throw error;
    }
  }
}
