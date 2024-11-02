import { Model } from 'mongoose';

export type IAdmin = {
  phoneNumber: string;
  password: string;
  role: 'admin';
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  address: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
