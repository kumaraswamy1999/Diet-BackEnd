import express from 'express';
import userRoutes from '../routes/userRoute';

const router = express.Router();

router.use('/user',userRoutes);

export default router;