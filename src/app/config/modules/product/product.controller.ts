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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
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

      if (!Array.isArray(searchResult)) {
        res.status(404).json({
          success: false,
          message: `Products matching search term '${searchTerm}' not found`,
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
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductServices.getSingleProductFromDB(productId);
    //if product not found
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    } else {
      // if product found
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: product,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateDetails = req.body;

    const updatedProduct = await ProductServices.updatedProductOnDB(
      productId,
      updateDetails,
    );

    if (updatedProduct === false) {
      res.status(404).json({
        success: false,
        message: 'Product not found to update',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: updatedProduct,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const isDeleted = await ProductServices.deleteProductFromDB(productId);

    if (isDeleted === false) {
      res.status(404).json({
        success: false,
        message: 'Product not found to delete',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        date: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
