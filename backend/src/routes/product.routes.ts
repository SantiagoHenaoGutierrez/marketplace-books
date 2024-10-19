// backend/src/routes/product.routes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', ProductController.getProducts);
router.post('/', authenticateToken, ProductController.createProduct);
router.put('/:id/stock', authenticateToken, ProductController.updateStock);

export default router;