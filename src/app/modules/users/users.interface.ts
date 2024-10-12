import { Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  sellerId?: Types.ObjectId | ISeller;
  buyerId?: Types.ObjectId | ISeller;
  role: string;
  password: string;
  phoneNumber: string;
};
