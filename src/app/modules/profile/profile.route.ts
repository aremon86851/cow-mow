import express from 'express';
import { auth } from '../../middlewares/auth';
import { profileController } from './profile.controller';
const ProfileRoutes = express.Router();

ProfileRoutes.get('/me', auth(), profileController.getUserProfile);
ProfileRoutes.patch('/me', auth(), profileController.updateUserProfile);

// UserRoute.post(
//   '/create-seller',
//   validationRequest(UserZodValidation.createSellerZodValidation),
//   usersController.createSeller
// );

export default ProfileRoutes;
