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

// Catching all route for handling not found routes

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
