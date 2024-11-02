import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Buyer } from '../buyer/buyer.model';
import { Seller } from '../seller/seller.model';

export const getProfileByBuyer = async (id: string) => {
  const findOrder = await Buyer.findById({ _id: id });
  return findOrder;
};

export const getProfilesBySeller = async (id: string) => {
  const seller = await Seller.findById({ _id: id });
  if (!seller)
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller info not found');
  return seller;
};
