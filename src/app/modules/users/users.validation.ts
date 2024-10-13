import { z } from 'zod';
// import { UserRoles } from './users.constant';

const createUserZodValidation = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    password: z.string({ required_error: 'Password is required' }),
    name: z.object({
      firstName: z.string({ required_error: 'First Name is required' }),
      middleName: z.string().optional(),
      lastName: z.string({ required_error: 'Last Name is required' }),
    }),
    role: z.enum(['seller', 'buyer'], {
      required_error: 'Role is required',
    }),
    address: z.string({ required_error: 'Address is required' }),
    budget: z.number().min(0, {
      message: 'Budget must be a positive number',
    }),
    income: z.number().min(0, {
      message: 'Income must be a positive number',
    }),
  }),
});

const updateUserZodValidation = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    role: z.enum(['seller', 'buyer']).optional(),
    address: z.string().optional(),
    budget: z
      .number()
      .min(0, {
        message: 'Budget must be a positive number',
      })
      .optional(),
    income: z
      .number()
      .min(0, {
        message: 'Income must be a positive number',
      })
      .optional(),
  }),
});

export const UserZodValidation = {
  createUserZodValidation,
  updateUserZodValidation,
};
