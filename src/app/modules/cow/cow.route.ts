import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { CowZodValidation } from './cow.validation';
import { CowController } from './cow.controller';
import { auth } from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enum/user';
const CowRotes = express.Router();

CowRotes.get(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
);

CowRotes.post(
  '/create-cow',
  validationRequest(CowZodValidation.createCowZodValidation),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);

CowRotes.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCows
);
CowRotes.patch(
  '/:id',
  validationRequest(CowZodValidation.updateCowZodValidation),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCow
);

CowRotes.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export default CowRotes;
