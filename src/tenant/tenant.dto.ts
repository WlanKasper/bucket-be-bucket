import { Catalog } from "@/catalog/catalog.model";
import { Tenant } from "./tenant.model";

export class TenantDto {
    id: number;
    first_name: string;
    last_name: string;
    avatar_url?: string;
    catalogs: Catalog[];
}

export const toTenantDto = (tenant: Tenant, catalogs: Catalog[]): TenantDto => {
  return {
    id: tenant.id,
    first_name: tenant.first_name,
    last_name: tenant.last_name,
    avatar_url: tenant.avatar_url,
    catalogs: catalogs,
  };
};