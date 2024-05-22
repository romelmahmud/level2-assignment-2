// product model

import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TInventory,
  TProduct,
  TVariant,
} from './product.interface';

const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, 'Variant type is required'],
  },
  value: {
    type: String,
    required: [true, 'Variant value is required'],
  },
});

// Define the Inventory Schema
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

// Define the Product Schema
const productSchema = new Schema<TProduct, ProductModel>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  tags: [
    {
      type: String,
      required: [true, 'Product tags are required'],
    },
  ],
  variants: [
    {
      type: variantSchema,
      required: [true, 'Product variant information is required'],
    },
  ],
  inventory: {
    type: inventorySchema,
    required: [true, 'Product inventory information is required'],
  },
});

// creating a custom static method checking if product exists

productSchema.statics.isProductExists = async function (name: string) {
  const existingProduct = await Product.findOne({ name });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
