import { z } from 'zod';

// Defining the Zod schema for the Variant
const variantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

// Defining the Zod schema for the Inventory
const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, { message: 'Quantity must be at least 0' }),
  inStock: z.boolean().default(true),
});

// Defining the Zod schema for the Product
const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }).trim(),
  description: z
    .string()
    .min(1, { message: 'Product description is required' })
    .trim(),
  price: z.number().positive({ message: 'Product price must be positive' }),
  category: z.string().min(1, { message: 'Product category is required' }),
  tags: z.array(z.string().min(1, { message: 'Product tags are required' })),
  variant: variantValidationSchema,
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
