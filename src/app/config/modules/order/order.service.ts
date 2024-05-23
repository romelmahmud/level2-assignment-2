import { TOrder } from './order.interface';
import { Order } from './order.model';

const createNewOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrdersFromDB = async (userEmail?: string | undefined) => {
  const orders = await Order.find();
  if (typeof userEmail === 'undefined') {
    return orders;
  }
  if (userEmail) {
    // Filter orders based on user email
    const filteredOrders = orders.filter(order => {
      return order.email === userEmail;
    });
    return filteredOrders;
  }
};

export const OrderServices = {
  createNewOrderIntoDB,
  getAllOrdersFromDB,
};
