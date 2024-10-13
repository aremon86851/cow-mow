import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { CowZodValidation } from './cow.validation';
import { CowController } from './cow.controller';
const CowRotes = express.Router();

CowRotes.get('/:id', CowController.getSingleCow);

CowRotes.post(
  '/create-cow',
  validationRequest(CowZodValidation.createCowZodValidation),
  CowController.createCow
);

CowRotes.get('/', CowController.getAllCows);
CowRotes.patch(
  '/:id',
  validationRequest(CowZodValidation.updateCowZodValidation),
  CowController.updateCow
);

CowRotes.delete('/:id', CowController.deleteCow);

export default CowRotes;
