import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await OrderServices.createNewOrderIntoDB(orderData);
    // if order not completed
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    // if order placed successfully
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email }: any = req.query;
    if (email) {
      const result = await OrderServices.getAllOrdersFromDB(email);

      // if email not found in db

      if (!Array.isArray(result)) {
        res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
