import express from 'express';
import UserRoute from '../modules/users/users.route';
import CowRotes from '../modules/cow/cow.route';
import OrdersRotes from '../modules/orders/orders.route';
import AuthRoutes from '../modules/auth/auth.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/cows', CowRotes);
routes.use('/orders', OrdersRotes);
routes.use('/auth', AuthRoutes);

export default routes;
