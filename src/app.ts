import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { OrderRoutes } from './app/config/modules/order/order.route';
import { ProductRoutes } from './app/config/modules/product/product.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// Application routes

// Product routes
app.use('/api/products', ProductRoutes);

// Order routes
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
