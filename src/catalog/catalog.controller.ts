import { Body, Controller, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { CatalogCreateRequest, CatalogPatchRequest } from './catalog.model';
import { CatalogService } from './catalog.service';
import { CatalogDto } from './catalog.dto';

@Controller('api/catalog')
export class CatalogController {
  private logger = new Logger(CatalogController.name);

  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  public async createCatalog(@Body() requestBody: CatalogCreateRequest): Promise<CatalogDto> {
    try {
      const catalog = await this.catalogService.createCatalog(requestBody);
      this.logger.log(`Catalog created with ID: ${catalog.id}`);
      return catalog;
    } catch (error) {
      this.logger.error(`Error creating catalog: ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  public async getCatalogById(@Param('id') id: string): Promise<CatalogDto> {
    try {
      const catalog = await this.catalogService.getCatalogById(id);
      this.logger.log(`Found catalog with ID: ${catalog.id}`);
      return catalog;
    } catch (error) {
      this.logger.error(`Error getting catalog by ID: ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  public async patchCatalogById(@Param('id') id: string, @Body() requestBody: CatalogPatchRequest): Promise<CatalogDto> {
    try {
      const catalog = await this.catalogService.patchCatalogById(id, requestBody);
      this.logger.log(`Catalog patched with ID: ${catalog.id}`);
      return catalog;
    } catch (error) {
      this.logger.error(`Error patching catalog by ID: ${error.message}`);
      throw error;
    }
  }
}
