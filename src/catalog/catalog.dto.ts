import { ItemDto, toItemDto } from '@/item/item.dto';
import { Catalog } from './catalog.model';

export class CatalogDto {
  id: string;
  name: string;
  description: string;
  items: ItemDto[];
}

export const toCatalogDto = (catalog: Catalog): CatalogDto => ({
  id: catalog.id.toString(),
  name: catalog.name,
  description: catalog.description,
  items: catalog.items.map((item) => toItemDto(item)),
});
