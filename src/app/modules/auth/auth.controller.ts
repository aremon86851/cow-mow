import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.services';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginUser } = req.body;
  const result = await AuthService.loginUser(loginUser);
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid login');

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  const { refreshToken, ...other } = result;
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: other,
  });
});

export const AuthController = {
  loginUser,
};
