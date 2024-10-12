import { model, Schema } from 'mongoose';
import { IUser } from './users.interface';

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'seller',
    },
    buyerId: { type: Schema.Types.ObjectId, ref: 'buyer' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser>('users', userSchema);
