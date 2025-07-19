import express from 'express';
import userRoutes from '../routes/userRoute';
import goalRoutes from '../routes/goalRoute';
import bmiRoutes from '../routes/bmiRoute';

const router = express.Router();

router.use('/user',userRoutes);
router.use('/goal',goalRoutes);
router.use('/bmi',bmiRoutes);

export default router;