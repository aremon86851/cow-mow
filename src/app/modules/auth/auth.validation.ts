import { z } from 'zod';

const loginUserZodValidation = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone Number must be provided' }),
    password: z.string({ required_error: 'Phone Number must be provided' }),
  }),
});

export const AuthZodValidation = {
  loginUserZodValidation,
};
