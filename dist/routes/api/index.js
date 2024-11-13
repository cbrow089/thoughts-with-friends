import { Router } from 'express';
import userRouter from './userRoutes.js';
import thoughtRouter from './thoughtRoutes.js';
const router = Router();
//TODO: Add routes
router.use('/users', userRouter);
router.use('/thoughts', thoughtRouter);
export default router;
