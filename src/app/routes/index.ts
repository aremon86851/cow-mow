import express from 'express';
import UserRoute from '../modules/users/users.route';
import CowRotes from '../modules/cow/cow.route';
const routes = express.Router();

routes.use('/users', UserRoute);
routes.use('/cows', CowRotes);

export default routes;
