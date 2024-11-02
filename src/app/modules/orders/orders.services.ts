/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Cow } from '../cow/cow.model';
import { Buyer } from '../buyer/buyer.model';
import { Seller } from '../seller/seller.model';
import { User } from '../users/users.model';
import { getOrdersByBuyer, getOrdersBySeller } from './orders.constant';

const createOrder = async (payload: IOrder): Promise<IOrder | undefined> => {
  const findBuyer: any = await Buyer.findById({ _id: payload.buyer });
  const findCow: any = await Cow.findById({ _id: payload.cow });
  const findSeller: any = await Seller.findById({ _id: findCow.seller });
  let createOrder;
  if (findCow.label === 'sold out')
    throw new ApiError(httpStatus.BAD_REQUEST, 'This cow already sold out');
  if (findBuyer.budget < findCow.price)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You don't have enough budget to buy"
    );
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    await Cow.updateOne(
      { _id: payload.cow },
      { label: 'sold out' },
      { new: true, session }
    );
    const updatedPriceForBuyer = findBuyer.budget - findCow.price;
    await Buyer.updateOne(
      { _id: payload.buyer },
      { budget: updatedPriceForBuyer },
      { new: true, session }
    );
    await Seller.updateOne(
      { _id: findCow.seller },
      { income: Number(findCow.price + findSeller?.income) },
      { session }
    );

    createOrder = await Order.create([payload], { session });
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Operations is failed: ${error}`
    );
  }
  return createOrder[0];
};

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById({ _id: id })
    .populate({ path: 'cow', model: 'Cow' })
    .populate({ path: 'buyer', model: 'Buyer' });
  return result;
};

const getOrders = async (userId: string): Promise<IOrder[] | null> => {
  const result: any = await User.findById({ _id: userId });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  let orders = null;
  console.log(result);
  if (result.role === 'buyer') {
    orders = await getOrdersByBuyer(result?.buyerId);
  } else if (result.role === 'seller') {
    orders = await getOrdersBySeller(result?.sellerId);
  }
  return orders;
};

export const OrderService = {
  createOrder,
  getSingleOrder,
  getOrders,
};
