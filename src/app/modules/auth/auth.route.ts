import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { AuthZodValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const AuthRoutes = express.Router();

AuthRoutes.post(
  '/login',
  validationRequest(AuthZodValidation.loginUserZodValidation),
  AuthController.loginUser
);

export default AuthRoutes;
