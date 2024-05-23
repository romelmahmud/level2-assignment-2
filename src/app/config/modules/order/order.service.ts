import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createNewOrderIntoDB = async (orderData: TOrder) => {
  const product = await Product.findById(orderData.productId);
  // checking if product exists
  if (!product) {
    throw new Error('Product not found');
  }
  // checking product inventory quantity
  if (product.inventory.quantity < orderData.quantity) {
    return false;
  }

  const result = await Order.create(orderData);

  // Update product quantity and inStock status
  if (product) {
    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();
  }

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
