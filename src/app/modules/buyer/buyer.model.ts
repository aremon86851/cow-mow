import { model, Schema } from 'mongoose';
import { IBuyer } from './buyer.interface';

const buyerSchema = new Schema<IBuyer>(
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

export const Buyer = model<IBuyer>('Buyer', buyerSchema);
