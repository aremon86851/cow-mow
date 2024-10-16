import { model, Schema } from 'mongoose';
import { IOrder } from './orders.interface';

const orderSchema = new Schema<IOrder>(
  {
    cow: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder>('Order', orderSchema);
