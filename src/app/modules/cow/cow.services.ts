import { ICow } from './cow.interface';
import { Cow } from './cow.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createCow = async (payload: ICow): Promise<ICow | undefined> => {
  const result = (await Cow.create(payload)).populate('seller');
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not created');
  return result;
};

const getSingleCow = async (id: string): Promise<ICow | undefined> => {
  const result = await Cow.findById({ _id: id }).populate('seller');
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not get');
  return result;
};

const getAllCows = async (): Promise<ICow[] | undefined> => {
  const result = await Cow.find().populate('seller');
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not get');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const { ...userData } = payload;
  const updatedCowData: Partial<ICow> = { ...userData };

  const findData = await Cow.findById(id);

  if (!findData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found');
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, updatedCowData, {
    new: true,
  });
  return result;
};
const deleteCow = async (id: string) => {
  const result = await Cow.deleteOne({ _id: id });
  return result;
};

export const CowService = {
  createCow,
  getSingleCow,
  getAllCows,
  updateCow,
  deleteCow,
};
