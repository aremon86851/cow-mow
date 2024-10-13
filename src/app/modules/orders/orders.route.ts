import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { OrderZodValidation } from './orders.validation';
import { OrderController } from './orders.controller';
// import validationRequest from '../../middlewares/validationRequest';
// import { CowZodValidation } from './cow.validation';
// import { CowController } from './cow.controller';
const OrdersRotes = express.Router();

OrdersRotes.get('/:id', OrderController.getSingleOrder);

OrdersRotes.post(
  '/create-order',
  validationRequest(OrderZodValidation.createOrderZodValidation),
  OrderController.createOrder
);

// OrdersRotes.get('/', CowController.getAllCows);
// OrdersRotes.patch(
//   '/:id',
//   validationRequest(CowZodValidation.updateCowZodValidation),
//   CowController.updateCow
// );

// OrdersRotes.delete('/:id', CowController.deleteCow);

export default OrdersRotes;
