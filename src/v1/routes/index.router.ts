import { Router } from 'express';
import authRouter from './auth.router';
import bookRouter from './book.router';
import reviewRouter from './review.router';
import categoryRouter from './category.router';
import ebookRouter from './ebook.router';
import orderRouter from './order.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/book', bookRouter);
router.use('/review', reviewRouter);
router.use('/category', categoryRouter);
router.use('/ebook', ebookRouter);
router.use('/order', orderRouter);

export default router;