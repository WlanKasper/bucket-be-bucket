import { Tenant } from './tenant.model';
import { CatalogDto, toCatalogDto } from '@/catalog/catalog.dto';

export class TenantDto {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  catalogs: CatalogDto[];
}

export const toTenantDto = (tenant: Tenant): TenantDto => ({
  id: tenant.id,
  first_name: tenant.first_name,
  last_name: tenant.last_name,
  avatar_url: tenant.avatar_url,
  catalogs: tenant.catalogs.map(c => toCatalogDto(c)),
});
