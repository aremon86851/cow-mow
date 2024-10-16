import { Model, Types } from 'mongoose';
import { ICow } from '../cow/cow.interface';
import { IBuyer } from '../buyer/buyer.interface';

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IBuyer;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
