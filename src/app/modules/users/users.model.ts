import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './users.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
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

userSchema.methods.isUserExists = async function (
  phoneNumber
): Promise<Partial<IUser | null>> {
  const user = await User.findOne(
    { phoneNumber: phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
  return user;
};

userSchema.methods.isPasswordMatched = async function (
  hashPassword: string | undefined,
  givenPassword: string | undefined
): Promise<boolean> {
  if (!givenPassword || !hashPassword) return false;
  const password = await bcrypt.compare(givenPassword, hashPassword);
  return password;
};

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_round)
    );
    next();
  } catch {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Something is wrong');
  }
  next();
});

export const User = model<IUser, UserModel>('users', userSchema);
