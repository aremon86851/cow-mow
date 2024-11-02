import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Order } from './orders.model';

export const getOrdersByBuyer = async (id: string) => {
  const findOrder = await Order.find({ buyer: id });
  return findOrder;
};

export const getOrdersBySeller = async (id: string) => {
  const orders = await Order.find().populate('cow');
  if (!orders) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterOrder = orders.filter((order: any) => order?.seller === id);

  return filterOrder;
};
