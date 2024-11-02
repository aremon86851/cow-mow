import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../users/users.interface';
import { User } from '../users/users.model';
import { IUserLogin } from './auth.interface';
import { JWTHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const loginUser = async (
  payload: IUserLogin
): Promise<Partial<IUser | null>> => {
  const { phoneNumber, password } = payload;
  const user = new User();
  const findUser = await user.isUserExists(phoneNumber);
  if (!findUser) throw new ApiError(httpStatus.NOT_FOUND, ' User not found');
  const verifyPassword = await user.isPasswordMatched(
    findUser.password as string,
    password
  );
  if (!verifyPassword)
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Password is incorrect');
  const accessToken = JWTHelper.createJWTToken(
    { id: findUser?.id, role: findUser.role },
    config.access_token as Secret,
    config.access_token_expire_in as string
  );
  const refreshToken = JWTHelper.createJWTToken(
    { id: findUser?.id, phoneNumber: findUser.phoneNumber },
    config.refresh_token as Secret,
    config.refresh_token_expire_in as string
  );
  const { id, role } = findUser;
  return { id, role, phoneNumber, accessToken, refreshToken };
};

export const AuthService = {
  loginUser,
};
