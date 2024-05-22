// product controller

import { Request, Response } from 'express';

const createProduct = async (req: Request, res: Response) => {
  console.log('product created');
};

const getAllProducts = async (req: Request, res: Response) => {
  // console.log(req.params);
  const { productId } = req.params;
  const { searchTerm } = req.query;

  if (productId) {
    console.log('got a specific product', productId);
  } else if (searchTerm) {
    console.log('product searching', searchTerm);
  } else {
    console.log('got all product');
  }
};

const updateProduct = async (req: Request, res: Response) => {
  console.log('product updated');
};

const deleteProduct = async (req: Request, res: Response) => {
  console.log('product deleted');
};

const searchProduct = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  if (searchTerm) {
    console.log('product searching', searchTerm);
  } else {
    console.log('got all product');
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};
