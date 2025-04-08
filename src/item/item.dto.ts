import { Item } from './item.model';

export class ItemDto {
  id: string;
  label: string;
  isChecked: boolean;
}

export const toItemDto = (item: Item): ItemDto => ({
  id: item.id.toString(),
  label: item.label,
  isChecked: item.isChecked,
});
