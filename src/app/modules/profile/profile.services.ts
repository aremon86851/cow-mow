/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { getProfileByBuyer, getProfilesBySeller } from './profile.constant';
import { User } from '../users/users.model';
import { ISeller } from '../seller/seller.interface';
import { IBuyer } from '../buyer/buyer.interface';
import { IUser } from '../users/users.interface';
import { Seller } from '../seller/seller.model';
import { Buyer } from '../buyer/buyer.model';

const getUserProfile = async (
  user: any
): Promise<Partial<ISeller | IBuyer | null>> => {
  const findUser: any = await User.findById(user.id);
  let userInfo = null;
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  if (user.role === 'buyer')
    userInfo = await getProfileByBuyer(findUser?.buyerId);
  else if (user.role === 'seller')
    userInfo = await getProfilesBySeller(findUser?.sellerId);
  return userInfo;
};

const updateProfile = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { name, ...userData }: any = payload;
  const updatedUserData: Partial<IUser> = { ...userData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const findData = await User.findById(id);
  if (!findData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  })
    .populate({ path: 'sellerId', model: 'Seller' })
    .populate({ path: 'buyerId', model: 'Buyer' });
  if (result?.sellerId) {
    await Seller.findOneAndUpdate({ _id: result?.sellerId }, updatedUserData, {
      new: true,
    });
  } else if (result?.buyerId) {
    await Buyer.findOneAndUpdate({ _id: result?.buyerId }, updatedUserData, {
      new: true,
    });
  }
  return result;
};

export const ProfileService = {
  getUserProfile,
  updateProfile,
};
