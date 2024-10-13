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

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single cow get successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.getAllCows();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows successfully',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CowService.updateCow(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows update successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.deleteCow(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows delete successfully',
    data: result,
  });
});

export const CowController = {
  createCow,
  getSingleCow,
  getAllCows,
  updateCow,
  deleteCow,
};
