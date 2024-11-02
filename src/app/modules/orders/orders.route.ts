import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { OrderZodValidation } from './orders.validation';
import { OrderController } from './orders.controller';
import { ENUM_USER_ROLE } from '../../../enum/user';
import { auth } from '../../middlewares/auth';
// import validationRequest from '../../middlewares/validationRequest';
// import { CowZodValidation } from './cow.validation';
// import { CowController } from './cow.controller';
const OrdersRotes = express.Router();

OrdersRotes.get('/:id', OrderController.getSingleOrder);

OrdersRotes.post(
  '/create-order',
  validationRequest(OrderZodValidation.createOrderZodValidation),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);

OrdersRotes.get(
  '/',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  OrderController.getOrders
);
// OrdersRotes.patch(
//   '/:id',
//   validationRequest(CowZodValidation.updateCowZodValidation),
//   CowController.updateCow
// );

// OrdersRotes.delete('/:id', CowController.deleteCow);

export default OrdersRotes;
