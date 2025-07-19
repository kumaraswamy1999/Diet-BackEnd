import express from 'express';
import { validateRequest } from '../middlewares/validateRequest';
import { AuthLogin, getDietician, RegisterUser } from '../modules/users/user.controllers';


const router = express.Router();

router.post('/login', validateRequest, AuthLogin);
router.post('/register', validateRequest, RegisterUser);
router.get('/:role',getDietician);

export default router;