import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import usersController from './users.controller';
import { UserZodValidation } from './users.validation';
const UserRoute = express.Router();

UserRoute.post(
  '/create-seller',
  validationRequest(UserZodValidation.createUserZodValidation),
  usersController.createSeller
);

UserRoute.post(
  '/create-buyer',
  validationRequest(UserZodValidation.createUserZodValidation),
  usersController.createBuyer
);

export default UserRoute;
