import { Router } from 'express';
import { createSessionController } from '../controllers';
import { checkAuth } from '../middlewares';
import { RolesForSelect } from '../types';

const router = Router();

router.post('/', checkAuth(RolesForSelect.user), createSessionController);

export default router;
