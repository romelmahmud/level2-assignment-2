// product controller

import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    // validating product data with Zod
    const zodParsedData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const { searchTerm }: any = req.query;

  try {
    if (searchTerm) {
      const searchResult =
        await ProductServices.getAllProductsFromDB(searchTerm);

      // if searchTerm not found in db
      if (Array.isArray(searchResult)) {
        res.status(404).json({
          success: false,
          message: `Products matching search term '${searchTerm}' not found`,
          data: searchResult,
        });
      }
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: searchResult,
      });
    } else {
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  console.log('Got a single product', productId);
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
  getSingleProduct,
};
