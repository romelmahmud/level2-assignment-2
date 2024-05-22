import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);

router.get('/:productId?', ProductControllers.getAllProducts);

router.put('/', ProductControllers.updateProduct);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
