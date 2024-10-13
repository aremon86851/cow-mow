import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import usersController from './users.controller';
import { UserZodValidation } from './users.validation';
const UserRoute = express.Router();

UserRoute.get('/:id', usersController.getSingleUser);

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
UserRoute.get('/', usersController.getAllUsers);
UserRoute.patch(
  '/:id',
  validationRequest(UserZodValidation.updateUserZodValidation),
  usersController.updateUser
);

UserRoute.delete('/:id', usersController.deleteUser);

export default UserRoute;
