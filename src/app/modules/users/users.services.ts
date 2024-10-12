import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ISeller } from '../seller/seller.interface';
import { Seller } from '../seller/seller.model';
import { User } from './users.model';
import { Buyer } from '../buyer/buyer.model';

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

export const UserService = {
  createSeller,
  createBuyer,
};
