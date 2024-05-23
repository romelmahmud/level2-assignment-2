import { Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await OrderServices.createNewOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

const getAllOrders = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (email) {
    console.log('getting order by email', email);
  } else {
    console.log('getting all order');
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
