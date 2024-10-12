import { ICow } from './cow.interface';
import { Cow } from './cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCow = async (payload: ICow): Promise<ICow | undefined> => {
  const result = (await Cow.create(payload)).populate('seller');
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not created');
  return result;
};
export const CowService = {
  createCow,
};
