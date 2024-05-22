// product service

import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.name)) {
    throw new Error('Product already exists');
  }

  const result = await Product.create(productData);

  return result;
};

const getAllProductsFromDB = async (searchTerm?: string | undefined) => {
  const result = await Product.find();
  if (typeof searchTerm === 'undefined') {
    return result;
  }
  if (searchTerm) {
    // Filter products based on the searchTerm in name, description, category or tags
    const filteredProducts = result.filter(product => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.tags.some(tag =>
          tag.toLowerCase().includes(lowerCaseSearchTerm),
        )
      );
    });
    return filteredProducts;
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
