// product controller

import { Request, Response } from 'express';

const createProduct = async (req: Request, res: Response) => {
  console.log('product created');
};

const getAllProducts = async (req: Request, res: Response) => {
  if (req.params) {
    console.log('got a specific product');
  } else {
    console.log('all product got');
  }
};

const updateProduct = async (req: Request, res: Response) => {
  console.log('product updated');
};

const deleteProduct = async (req: Request, res: Response) => {
  console.log('product deleted');
};

const searchProduct = async (req: Request, res: Response) => {
  console.log('product searching');
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
};
