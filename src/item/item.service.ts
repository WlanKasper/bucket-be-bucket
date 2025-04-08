import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemCreateRequest, ItemPatchRequest } from './item.model';
import { ItemRepository } from './item.repository';
import { ItemDto, toItemDto } from './item.dto';
import { Types } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(private readonly repo: ItemRepository) {}

  public async createItem(request: ItemCreateRequest): Promise<ItemDto> {
    const created = await this.repo.create(request);
    return toItemDto(created);
  }

  public async getItemById(id: string | Types.ObjectId): Promise<ItemDto> {
    const item = await this.repo.findById(id);

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found!`);
    }

    return toItemDto(item);
  }

  public async patchItemById(id: string | Types.ObjectId, request: ItemPatchRequest): Promise<ItemDto> {
    const patched = await this.repo.patchById(id, request);

    if (!patched) {
      throw new NotFoundException(`Item with ID ${id} not found!`);
    }

    return toItemDto(patched);
  }

  public async deleteItemById(id: string | Types.ObjectId): Promise<ItemDto> {
    const deleted = await this.repo.deleteById(id);

    if (!deleted) {
      throw new NotFoundException(`Item with ID ${id} not found!`);
    }

    return toItemDto(deleted);
  }
}
