import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserService } from './users.services';

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createSeller(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully',
    data: result,
  });
});

const createBuyer = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createBuyer(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer created successfully',
    data: result,
  });
});

export default {
  createSeller,
  createBuyer,
};
