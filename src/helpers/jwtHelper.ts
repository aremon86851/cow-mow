/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { Secret } from 'jsonwebtoken';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

const createJWTToken = (data: any, secret: Secret, duration: string) => {
  const token = jwt.sign(data, secret, { expiresIn: duration });
  return token;
};

const verifyJWTToken = (token: string, tokenSecret: Secret) => {
  const verifyToken = jwt.verify(token, tokenSecret);
  if (!verifyToken)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  return verifyToken;
};

export const JWTHelper = {
  createJWTToken,
  verifyJWTToken,
};
