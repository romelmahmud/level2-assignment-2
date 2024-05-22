// product service

import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  if (await Product.isProductExists(productData.name)) {
    throw new Error('Product already exists');
  }

  const products = await Product.create(productData);

  return products;
};

const getAllProductsFromDB = async (searchTerm?: string | undefined) => {
  const products = await Product.find();
  if (typeof searchTerm === 'undefined') {
    return products;
  }
  if (searchTerm) {
    // Filter products based on the searchTerm in name, description, category or tags
    const filteredProducts = products.filter(product => {
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

const getSingleProductFromDB = async (productId: string) => {
  const product = await Product.findOne({ _id: productId });
  return product;
};

const updatedProductOnDB = async (productId: string, updateDetails: any) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return false;
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateDetails,
    { new: true },
  );
  return updatedProduct;
};

const deleteProductFromDB = async (productId: string) => {
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    return false;
  }
  await Product.findByIdAndDelete(productId);
  return true;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updatedProductOnDB,
  deleteProductFromDB,
};
