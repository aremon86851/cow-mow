import express from 'express';
import UserRoute from '../modules/users/users.route';
import CowRotes from '../modules/cow/cow.route';
import OrdersRotes from '../modules/orders/orders.route';
import AuthRoutes from '../modules/auth/auth.route';
import ProfileRoutes from '../modules/profile/profile.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/cows', CowRotes);
routes.use('/orders', OrdersRotes);
routes.use('/auth', AuthRoutes);
routes.use('/profile', ProfileRoutes);

export default routes;
