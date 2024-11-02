import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import usersController from './users.controller';
import { UserZodValidation } from './users.validation';
import { ENUM_USER_ROLE } from '../../../enum/user';
import { auth } from '../../middlewares/auth';
const UserRoute = express.Router();

UserRoute.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  usersController.getSingleUser
);

UserRoute.post(
  '/create-seller',
  validationRequest(UserZodValidation.createSellerZodValidation),
  usersController.createSeller
);

UserRoute.post(
  '/create-buyer',
  validationRequest(UserZodValidation.createBuyerZodValidation),
  usersController.createBuyer
);
UserRoute.post(
  '/create-admin',
  validationRequest(UserZodValidation.createAdminZodValidation),
  usersController.createAdmin
);
UserRoute.get('/', auth(ENUM_USER_ROLE.ADMIN), usersController.getAllUsers);
UserRoute.patch(
  '/:id',
  validationRequest(UserZodValidation.updateUserZodValidation),
  auth(ENUM_USER_ROLE.ADMIN),
  usersController.updateUser
);

UserRoute.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  usersController.deleteUser
);

export default UserRoute;
