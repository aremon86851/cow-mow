import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { OrderService } from './orders.services';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await OrderService.createOrder(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrder(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order get successfully',
    data: result,
  });
});
const getOrders = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload | null = req.user;
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  const result = await OrderService.getOrders(user.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order get successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getSingleOrder,
  getOrders,
};
