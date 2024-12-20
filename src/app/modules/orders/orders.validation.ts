import { z } from 'zod';

const createOrderZodValidation = z.object({
  body: z.object({
    cow: z.string({ required_error: 'Cow is required' }),
    buyer: z.string({ required_error: 'Buyer is required' }),
  }),
});

export const OrderZodValidation = {
  createOrderZodValidation,
};
