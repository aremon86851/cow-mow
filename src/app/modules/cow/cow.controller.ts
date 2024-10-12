import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Request, Response } from 'express';
import { CowService } from './cow.services';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await CowService.createCow(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});
export const CowController = {
  createCow,
};
