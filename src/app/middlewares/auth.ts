/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { JWTHelper } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
      let verifyUser: any = null;
      verifyUser = JWTHelper.verifyJWTToken(
        token,
        config.access_token as Secret
      );
      req.user = verifyUser;
      if (requiredRoles.length > 0 && !requiredRoles.includes(verifyUser.role))
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "You don't have permission to access this page"
        );
      next();
    } catch (err) {
      next(err);
    }
  };
