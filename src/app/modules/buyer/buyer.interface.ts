import { Model } from 'mongoose';

export type IBuyer = {
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

export type BuyerModel = Model<IBuyer, Record<string, unknown>>;
