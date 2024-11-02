import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ProfileService } from './profile.services';
import sendResponse from '../../../shared/sendResponse';
import { JwtPayload } from 'jsonwebtoken';

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProfileService.getUserProfile(user);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  });
});

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload | null = req.user;
  const payload = req.body;
  const result = await ProfileService.updateProfile(user?.id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update  successfully',
    data: result,
  });
});

export const profileController = {
  getUserProfile,
  updateUserProfile,
};
