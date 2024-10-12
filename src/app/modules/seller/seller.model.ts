import { model, Schema } from 'mongoose';
import { ISeller } from './seller.interface';

const sellerSchema = new Schema<ISeller>(
  {
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    income: { type: Number, required: true },
    budget: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Seller = model<ISeller>('Seller', sellerSchema);
