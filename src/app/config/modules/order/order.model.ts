import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  productId: {
    type: String,
    required: [true, 'productId is required'],
  },
  price: {
    type: Number,
    required: [true, 'product price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'product quantity is required'],
  },
});

export const Order = model('Order', orderSchema);
