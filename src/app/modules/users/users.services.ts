import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ISeller } from '../seller/seller.interface';
import { Seller } from '../seller/seller.model';
import { User } from './users.model';
import { Buyer } from '../buyer/buyer.model';
import { IUser } from './users.interface';

const createSeller = async (payload: ISeller) => {
  let result;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const seller = await Seller.create([payload], { session });
    console.log(seller[0]?._id, seller[0]?.id);
    if (!seller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller not created');
    }
    const userInfo = {
      sellerId: seller[0]?._id,
      phoneNumber: seller[0].phoneNumber,
      password: seller[0].password,
      role: seller[0].role,
    };
    result = await User.create([userInfo], { session });
    if (!result.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not created');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
  return result;
};
const createBuyer = async (payload: ISeller) => {
  let result;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const buyer = await Buyer.create([payload], { session });
    console.log(buyer[0]?._id, buyer[0]?.id);
    if (!buyer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer not created');
    }
    const userInfo = {
      buyerId: buyer[0]?._id,
      phoneNumber: buyer[0].phoneNumber,
      password: buyer[0].password,
      role: buyer[0].role,
    };
    result = await User.create([userInfo], { session });
    if (!result.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not created');
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
  return result;
};

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find()
    .populate({ path: 'sellerId', model: 'Seller' }) // Populating sellerId if it exists
    .populate({ path: 'buyerId', model: 'Buyer' }); // Populating buyerId if it exists;
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
    .populate({ path: 'sellerId', model: 'Seller' })
    .populate({ path: 'buyerId', model: 'Buyer' });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

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

  console.log({ ...userData }, findData, result);
  return result;
};
const deleteUser = async (id: string) => {
  const findData = await User.findById(id);
  if (!findData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const deleteUser = await User.deleteOne({ _id: id })
    .populate({ path: 'sellerId', model: 'Seller' })
    .populate({ path: 'buyerId', model: 'Buyer' });

  if (findData?.sellerId) {
    await Seller.deleteOne({ _id: findData?.sellerId });
  } else if (findData?.buyerId) {
    await Buyer.deleteOne({ _id: findData?.buyerId });
  }

  return deleteUser;
};

export const UserService = {
  createSeller,
  createBuyer,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
