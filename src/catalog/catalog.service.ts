import { Injectable, NotFoundException } from '@nestjs/common';
import { CatalogCreateRequest, CatalogPatchRequest } from './catalog.model';
import { CatalogRepository } from './catalog.repository';
import { CatalogDto, toCatalogDto } from './catalog.dto';
import { Types } from 'mongoose';

@Injectable()
export class CatalogService {
  constructor(private readonly repo: CatalogRepository) {}

  public async createCatalog(request: CatalogCreateRequest): Promise<CatalogDto> {
    const created = await this.repo.create(request);
    return toCatalogDto(created);
  }

  public async getCatalogById(id: string | Types.ObjectId): Promise<CatalogDto> {
    const catalog = await this.repo.findById(id);

    if (!catalog) {
      throw new NotFoundException(`Catalog with ID ${id} not found!`);
    }

    return toCatalogDto(catalog);
  }

  public async patchCatalogById(id: string | Types.ObjectId, request: CatalogPatchRequest): Promise<CatalogDto> {
    const patched = await this.repo.patchById(id, request);

    if (!patched) {
      throw new NotFoundException(`Catalog with ID ${id} not found!`);
    }

    return toCatalogDto(patched);
  }

  public async deleteCatalogById(id: string | Types.ObjectId): Promise<CatalogDto> {
    const deleted = await this.repo.deleteById(id);

    if (!deleted) {
      throw new NotFoundException(`Catalog with ID ${id} not found!`);
    }

    return toCatalogDto(deleted);
  }
}
