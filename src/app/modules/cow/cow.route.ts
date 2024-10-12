import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { CowZodValidation } from './cow.validation';
import { CowController } from './cow.controller';
const CowRotes = express.Router();

CowRotes.post(
  '/create-cow',
  validationRequest(CowZodValidation.createCowZodValidation),
  CowController.createCow
);
export default CowRotes;
