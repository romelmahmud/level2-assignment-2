// product interface

import { Model } from 'mongoose';

export interface TVariant {
  type: string;
  value: string;
}

export interface TInventory {
  quantity: number;
  inStock: boolean;
}
export interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
}

export interface ProductModel extends Model<TProduct> {
  isProductExists(name: string): Promise<TProduct | null>;
}
