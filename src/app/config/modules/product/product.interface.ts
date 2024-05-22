// product interface

interface TVariant {
  type: string;
  value: string;
}

interface TInventory {
  quantity: number;
  inStock: boolean;
}
export interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: [string];
  variant: TVariant;
  inventory: TInventory;
}
