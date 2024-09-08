import { Types } from 'mongoose';

export const getIdAsObjectId = (id: string): string | Types.ObjectId => {
  return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : id;
};
