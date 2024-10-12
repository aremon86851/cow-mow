import { z } from 'zod';
import { breed, locations } from './cow.constant';

const createCowZodValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    age: z.number().min(0, 'Age must be a positive number'),
    price: z.number().min(0, 'Price must be a positive number'),
    location: z.enum([...locations] as [string], {
      required_error: 'Location is required',
    }),
    breed: z.enum([...breed] as [string], {
      required_error: 'Breed is required',
    }),
    weight: z.number().min(0, 'Weight must be a positive number'),
    label: z.enum(['for sale', 'sold out']).default('for sale'),
    category: z.enum(['Dairy', 'Beef', 'Dual Purpose']),
    seller: z.string(),
  }),
});

export const CowZodValidation = {
  createCowZodValidation,
};