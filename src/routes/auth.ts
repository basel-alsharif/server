import { Router } from 'express';
import {
  login, getAuth, register,
} from '../controllers';
import { checkToken } from '../middlewares';

const router = Router();
router.post('/login', login);
router.get('/', checkToken, getAuth);

router.post('/register', register);

export default router;
