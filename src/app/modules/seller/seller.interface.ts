import { Model } from 'mongoose';

export type ISeller = {
  phoneNumber: string;
  password: string;
  role: 'seller' | 'buyer';
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

export type SellerModel = Model<ISeller, Record<string, unknown>>;
