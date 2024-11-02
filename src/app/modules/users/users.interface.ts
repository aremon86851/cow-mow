import { Model, Types } from 'mongoose';
import { ISeller } from '../seller/seller.interface';

export type IUser = {
  id?: string;
  sellerId?: Types.ObjectId | ISeller;
  buyerId?: Types.ObjectId | ISeller;
  role: string;
  password: string;
  phoneNumber: string;
  accessToken?: string;
  refreshToken?: string;
};

export type IUserMethods = {
  isUserExists(phoneNumber: string): Promise<Partial<IUser | null>>;
  isPasswordMatched(
    hashPassword: string,
    givenPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
