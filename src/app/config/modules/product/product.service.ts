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
    // Filter products based on the searchTerm in name, description, category or tags using ReGex
    const regex = new RegExp(searchTerm, 'i'); // using 'i' flag makes search case insensitive

    const filteredProducts = products.filter(
      product =>
        regex.test(product.name) || // Checking in name
        regex.test(product.description) || // Checking in  description
        product.tags.some(tag => regex.test(tag)) || // Checking in each tag
        regex.test(product.category), // Checking in category
    );
    return filteredProducts;
  }
};

const getSingleProductFromDB = async (productId: string) => {
  const product = await Product.findOne({ _id: productId });
  return product;
};

const updatedProductOnDB = async (productId: string, updateDetails: any) => {
  const product = await Product.findOne({ _id: productId });
  // checking product is exists
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
