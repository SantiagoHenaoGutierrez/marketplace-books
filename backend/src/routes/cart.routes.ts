// backend/src/routes/cart.routes.ts
import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateToken, CartController.getCart);
router.post('/add', authenticateToken, CartController.addToCart);
router.post('/checkout', authenticateToken, CartController.checkout);

export default router;