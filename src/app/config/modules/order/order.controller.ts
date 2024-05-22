import { Request, Response } from 'express';

const createOrder = async (req: Request, res: Response) => {
  console.log('order created');
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
