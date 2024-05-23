import { z } from 'zod';

const orderSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string().min(1, { message: 'productId is required' }),
  price: z.number().positive({ message: 'price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .positive({ message: 'quantity must be a positive integer' }),
});

export default orderSchema;
