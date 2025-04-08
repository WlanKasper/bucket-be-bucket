import { Body, Controller, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { ItemCreateRequest, ItemPatchRequest } from './item.model';
import { ItemService } from './item.service';
import { ItemDto } from './item.dto';

@Controller('api/item')
export class ItemController {
  private logger = new Logger(ItemController.name);

  constructor(private readonly itemService: ItemService) {}

  @Post()
  public async createItem(@Body() requestBody: ItemCreateRequest): Promise<ItemDto> {
    try {
      const item = await this.itemService.createItem(requestBody);
      this.logger.log(`Item created with ID: ${item.id}`);
      return item;
    } catch (error) {
      this.logger.error(`Error creating item: ${error.message}`);
      throw error;
    }
  }

  @Get(':id')
  public async getItemById(@Param('id') id: string): Promise<ItemDto> {
    try {
      const item = await this.itemService.getItemById(id);
      this.logger.log(`Found item with ID: ${item.id}`);
      return item;
    } catch (error) {
      this.logger.error(`Error getting item by ID: ${error.message}`);
      throw error;
    }
  }

  @Patch(':id')
  public async patchItemById(@Param('id') id: string, @Body() requestBody: ItemPatchRequest): Promise<ItemDto> {
    try {
      const item = await this.itemService.patchItemById(id, requestBody);
      this.logger.log(`Item patched with ID: ${item.id}`);
      return item;
    } catch (error) {
      this.logger.error(`Error patching item by ID: ${error.message}`);
      throw error;
    }
  }
}