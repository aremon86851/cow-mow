import { model, Schema } from 'mongoose';
import { IBuyer } from './buyer.interface';

const buyerSchema = new Schema<IBuyer>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
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
