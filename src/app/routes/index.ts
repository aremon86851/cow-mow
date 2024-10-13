import express from 'express';
import UserRoute from '../modules/users/users.route';
import CowRotes from '../modules/cow/cow.route';
import OrdersRotes from '../modules/orders/orders.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/cows', CowRotes);
routes.use('/orders', OrdersRotes);

export default routes;
